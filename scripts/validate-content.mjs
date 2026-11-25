import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const projectRoot = process.cwd();
const blogConfigPath = path.join(projectRoot, "src", "config", "blog-posts.ts");
const publicRoot = path.join(projectRoot, "public");
const sourceText = fs.readFileSync(blogConfigPath, "utf8");
const sourceFile = ts.createSourceFile(
  blogConfigPath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS,
);

const errors = [];
const warnings = [];

function fail(context, message) {
  errors.push(`${context}: ${message}`);
}

function warn(context, message) {
  warnings.push(`${context}: ${message}`);
}

function unwrap(node) {
  let current = node;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isParenthesizedExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function findVariableArray(name) {
  let result;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (declaration.name.getText(sourceFile) !== name || !declaration.initializer) {
        continue;
      }
      const initializer = unwrap(declaration.initializer);
      if (ts.isArrayLiteralExpression(initializer)) result = initializer;
    }
  });
  return result;
}

function getProperty(object, name) {
  if (!object || !ts.isObjectLiteralExpression(object)) return undefined;
  const property = object.properties.find((candidate) => {
    if (!ts.isPropertyAssignment(candidate)) return false;
    const propertyName = candidate.name;
    return (
      (ts.isIdentifier(propertyName) ||
        ts.isStringLiteral(propertyName) ||
        ts.isNumericLiteral(propertyName)) &&
      propertyName.text === name
    );
  });
  return property && ts.isPropertyAssignment(property)
    ? unwrap(property.initializer)
    : undefined;
}

function getString(node) {
  const value = unwrap(node);
  if (!value) return undefined;
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text;
  }
  if (
    ts.isCallExpression(value) &&
    ts.isIdentifier(value.expression) &&
    value.expression.text === "cdnUrl" &&
    value.arguments.length === 1
  ) {
    return getString(value.arguments[0]);
  }
  return undefined;
}

function getArray(node) {
  const value = unwrap(node);
  return value && ts.isArrayLiteralExpression(value) ? value.elements : undefined;
}

function requiredString(post, property, context) {
  const value = getString(getProperty(post, property));
  if (!value?.trim()) fail(context, `missing non-empty ${property}`);
  return value?.trim() ?? "";
}

function isIsoDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validateMediaPath(value, context, extensions) {
  if (!value) return;
  if (/^https:\/\//.test(value)) {
    let url;
    try {
      url = new URL(value);
    } catch {
      fail(context, "invalid HTTPS URL");
      return;
    }
    if (url.hostname !== "media.flarepix.com") {
      fail(context, `unexpected media host ${url.hostname}`);
    }
    if (!extensions.includes(path.extname(url.pathname).toLowerCase())) {
      fail(context, `unsupported media extension in ${url.pathname}`);
    }
    return;
  }

  if (!value.startsWith("/") || value.includes("..") || /[?#]/.test(value)) {
    fail(context, "must be a root-relative public path without traversal, query, or hash");
    return;
  }
  const extension = path.extname(value).toLowerCase();
  if (!extensions.includes(extension)) {
    fail(context, `unsupported media extension ${extension || "(none)"}`);
  }

  const localPath = path.resolve(publicRoot, `.${value}`);
  if (!localPath.startsWith(publicRoot + path.sep)) {
    fail(context, "resolves outside public/");
    return;
  }
  if (!fs.existsSync(localPath)) {
    warn(context, `not present in the local R2 mirror: public${value}`);
  }
}

const blogPosts = findVariableArray("blogPosts");
if (!blogPosts) {
  fail("blogPosts", "could not locate the exported array");
} else {
  const slugs = new Set();
  let previousDate = "9999-12-31";

  for (const [index, element] of [...blogPosts.elements].entries()) {
    const post = unwrap(element);
    const fallbackContext = `blogPosts[${index}]`;
    if (!ts.isObjectLiteralExpression(post)) {
      fail(fallbackContext, "must be an object literal");
      continue;
    }

    const slug = requiredString(post, "slug", fallbackContext);
    const context = slug ? `blog/${slug}` : fallbackContext;
    const title = requiredString(post, "title", context);
    const date = requiredString(post, "date", context);
    const excerpt = requiredString(post, "excerpt", context);
    const heroImage = requiredString(post, "heroImage", context);
    const heroAlt = requiredString(post, "heroAlt", context);
    requiredString(post, "author", context);
    requiredString(post, "authorRole", context);
    requiredString(post, "authorBio", context);
    requiredString(post, "readTime", context);

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      fail(context, "slug must use lowercase kebab-case");
    }
    if (slugs.has(slug)) fail(context, "duplicate slug");
    slugs.add(slug);

    if (!isIsoDate(date)) fail(context, "date must be a real YYYY-MM-DD date");
    if (date > previousDate) {
      warn(context, "post order is curated rather than strictly newest first");
    }
    previousDate = date;

    const dateUpdated = getString(getProperty(post, "dateUpdated"));
    if (dateUpdated && !isIsoDate(dateUpdated)) {
      fail(context, "dateUpdated must be a real YYYY-MM-DD date");
    }
    if (dateUpdated && dateUpdated < date) {
      fail(context, "dateUpdated cannot be earlier than date");
    }
    if (title.length > 70) warn(context, `title is ${title.length} characters`);
    if (excerpt.length < 80 || excerpt.length > 180) {
      warn(context, `excerpt is ${excerpt.length} characters (target 80-180)`);
    }
    if (heroAlt.length < 20) warn(context, "heroAlt is unusually short");
    validateMediaPath(heroImage, `${context} heroImage`, [".avif", ".jpeg", ".jpg", ".png", ".webp"]);

    const relatedServices = getArray(getProperty(post, "relatedServices"));
    if (!relatedServices?.length) {
      fail(context, "relatedServices must contain at least one link");
    } else {
      relatedServices.forEach((service, serviceIndex) => {
        const href = getString(getProperty(unwrap(service), "href"));
        const label = getString(getProperty(unwrap(service), "label"));
        if (!label?.trim()) fail(context, `relatedServices[${serviceIndex}] needs a label`);
        if (!href?.startsWith("/") || href.startsWith("//") || href.includes("..")) {
          fail(context, `relatedServices[${serviceIndex}] has an unsafe internal href`);
        }
      });
    }

    const content = getArray(getProperty(post, "content"));
    if (!content?.length) {
      fail(context, "content must not be empty");
      continue;
    }
    const headingIds = new Set();
    content.forEach((block, blockIndex) => {
      const object = unwrap(block);
      const type = getString(getProperty(object, "type"));
      const blockContext = `${context} content[${blockIndex}]`;
      if (!type) {
        fail(blockContext, "missing type");
        return;
      }
      if (type === "heading") {
        const id = getString(getProperty(object, "id"));
        if (id) {
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
            fail(blockContext, "heading id must use lowercase kebab-case");
          }
          if (headingIds.has(id)) fail(blockContext, `duplicate heading id ${id}`);
          headingIds.add(id);
        }
      }
      if (type === "video") {
        const src = requiredString(object, "src", blockContext);
        requiredString(object, "title", blockContext);
        validateMediaPath(src, `${blockContext} src`, [".m4v", ".mov", ".mp4", ".webm"]);
      }
    });
  }
}

for (const message of warnings) console.warn(`WARN ${message}`);
for (const message of errors) console.error(`ERROR ${message}`);

if (errors.length) {
  console.error(`\nContent validation failed with ${errors.length} error(s).`);
  process.exitCode = 1;
} else {
  console.log(`Content validation passed (${blogPosts?.elements.length ?? 0} posts, ${warnings.length} warning(s)).`);
}
