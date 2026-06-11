/**
 * Step 1: Blog post → Video script
 *
 * Reads a blog post from blog-posts.ts and uses Claude API to generate
 * a structured video script (JSON) optimized for YouTube/TikTok/LinkedIn.
 *
 * Usage: node step1-script.js <slug>
 *   e.g.: node step1-script.js ai-product-videos-cannot-be-fully-automated
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const BLOG_POSTS_PATH = path.resolve(__dirname, "../../src/config/blog-posts.ts");
const OUTPUT_DIR = __dirname;
// ─────────────────────────────────────────────────────────────────────────

/**
 * Call Anthropic Claude API with a system prompt and user message.
 * Returns the response text.
 */
async function callClaude(systemPrompt, userMessage) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-sonnet-4-7-20251114",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.error) {
            return reject(new Error(parsed.error.message || "Claude API error"));
          }
          resolve(parsed.content[0].text);
        } catch (e) {
          reject(new Error(`Failed to parse Claude response: ${data}`));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/**
 * Extract blog post content from blog-posts.ts source.
 * Finds the post by slug and returns its full text content.
 */
function getBlogPost(slug) {
  const content = fs.readFileSync(BLOG_POSTS_PATH, "utf8");

  // Find the post by slug
  const slugRegex = new RegExp(
    `slug:\\s*["']${slug}["']\\s*,[^}]*title:\\s*["']([^"']+)["'][^}]*excerpt:\\s*["']([^"']+)["']`,
    "i"
  );
  const match = content.match(slugRegex);
  if (!match) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const title = match[1];
  const excerpt = match[2];

  // Find the content array for this post
  const postStart = content.indexOf(`slug: "${slug}"`);
  if (postStart === -1) throw new Error(`Slug not found in file: ${slug}`);

  // Find the next slug or end of file to delimit this post
  const nextSlugMatch = content.indexOf("slug:", postStart + 10);
  const postEnd =
    nextSlugMatch !== -1 ? content.lastIndexOf("];", nextSlugMatch) : content.length;
  const postSection = content.substring(postStart, postEnd);

  // Extract all text from paragraph and heading blocks
  const texts = [];
  const paragraphRegex = /\{ type:\s*"paragraph",\s*text:\s*"([^"]+)"\s*\}/g;
  let m;
  while ((m = paragraphRegex.exec(postSection)) !== null) {
    texts.push(m[1].replace(/\\n/g, " ").trim());
  }
  const headingRegex = /\{ type:\s*"heading",\s*level:\s*\d+,\s*text:\s*"([^"]+)"\s*(?:,\s*id:\s*"[^"]+")?\s*\}/g;
  while ((m = headingRegex.exec(postSection)) !== null) {
    texts.push("** " + m[1] + " **");
  }

  return { title, excerpt, paragraphs: texts };
}

/**
 * Build the Claude prompt for converting blog post to video script.
 */
function buildScriptPrompt(blog) {
  const paragraphsText = blog.paragraphs.join("\n\n");

  return `You are a YouTube video script writing expert for an Amazon product video studio called FlarePix.

Your task: Convert the blog post below into a structured JSON video script optimized for YouTube.

RULES:
- The script must be in English (for international audience)
- Total duration: 5-8 minutes when read aloud (aim for 750-900 words of narration)
- Structure: HOOK → PROBLEM → SOLUTION → CTA
- HOOK (0-30s): Start with a bold claim or surprising statistic that makes viewers stop scrolling
- PROBLEM (30s-2min): Expand on the problem from the blog
- SOLUTION (2min-5min): Present FlarePix's approach/hybrid solution
- CTA (5min-5min20s): Direct viewers to https://flarepix.com/services/ai-video
- For each scene: describe what should appear on screen (VISUAL), and what narration should say (NARRATION)
- Keep narration sentences punchy — max 25 words per line
- Use blog content for facts and data, but rewrite for spoken delivery

BLOG POST CONTENT:
${paragraphsText}

OUTPUT FORMAT — return ONLY valid JSON, no explanation:
{
  "title": "YouTube video title (≤60 chars, with primary keyword)",
  "description": "YouTube description (first 2 lines = value hook, last line = URL)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "scenes": [
    {
      "time": "0:00-0:30",
      "type": "hook",
      "visual": "What appears on screen (screen recording, split screen, text overlay, etc.)",
      "visualKeywords": "3-5 comma-separated keywords for Kling AI image-to-video prompt",
      "narration": "Exact narration text for this scene (max 25 words per line)"
    }
  ],
  "klingPrompts": [
    {
      "sceneIndex": 0,
      "prompt": "Full Kling AI image-to-video prompt for this scene based on visualKeywords"
    }
  ]
}

IMPORTANT:
- Return ONLY the JSON object. No markdown code blocks, no explanation.
- The klingPrompts array should have one entry per scene with visualKeywords.
- Make Kling prompts specific: include product type, camera movement, lighting, and style.
- narration should sound natural when spoken aloud — no semicolons, no wall-of-text.
- Total narration word count must be ≥ 700 words (this ensures5+ min video).`;
}

/**
 * Main function
 */
async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node step1-script.js <slug>");
    console.error(" e.g.: node step1-script.js ai-product-videos-cannot-be-fully-automated");
    process.exit(1);
  }

  if (!ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is not set.");
    console.error("Set it before running: export ANTHROPIC_API_KEY=your_key");
    process.exit(1);
  }

  console.log(`\n📝 Step 1: Generating video script for "${slug}"...\n`);

  // Load blog post
  const blog = getBlogPost(slug);
  console.log(`Title: ${blog.title}`);
  console.log(`Excerpt: ${blog.excerpt}`);
  console.log(`Paragraphs: ${blog.paragraphs.length}\n`);

  // Build prompt and call Claude
  const systemPrompt = `You are a YouTube video script writing expert. You ONLY output valid JSON. No markdown, no explanation.`;
  const userMessage = buildScriptPrompt(blog);

  console.log("Calling Claude API...\n");
  const rawResponse = await callClaude(systemPrompt, userMessage);

  // Strip any markdown code blocks if present
  let jsonText = rawResponse.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/```(?:json)?\n?/g, "").trim();
  }

  // Parse and validate
  let script;
  try {
    script = JSON.parse(jsonText);
  } catch (e) {
    console.error("❌ Failed to parse Claude response as JSON:");
    console.error(jsonText.substring(0, 500));
    process.exit(1);
  }

  // Validate required fields
  if (!script.title || !script.scenes || !Array.isArray(script.scenes)) {
    console.error("❌ Invalid script structure from Claude:");
    console.error(JSON.stringify(script, null, 2));
    process.exit(1);
  }

  // Count total narration words
  const totalWords = script.scenes
    .map((s) => (s.narration || "").split(" ").filter(Boolean).length)
    .reduce((a, b) => a + b, 0);
  console.log(`\n✅ Script generated successfully!`);
  console.log(`   Title: ${script.title}`);
  console.log(`   Scenes: ${script.scenes.length}`);
  console.log(`   Narration words: ${totalWords}`);
  console.log(`   Estimated duration: ${Math.round(totalWords / 150)} min`);
  console.log(`   Kling prompts: ${script.klingPrompts?.length || 0}`);

  // Save JSON script
  const outputPath = path.join(OUTPUT_DIR, `${slug}.script.json`);
  fs.writeFileSync(outputPath, JSON.stringify(script, null, 2), "utf8");
  console.log(`\n📄 Script saved to: ${outputPath}`);

  // Save Kling prompts separately
  if (script.klingPrompts && script.klingPrompts.length > 0) {
    const klingDir = path.join(OUTPUT_DIR, "kling-prompts");
    if (!fs.existsSync(klingDir)) fs.mkdirSync(klingDir, { recursive: true });
    const klingOutputPath = path.join(klingDir, `${slug}.kling-prompts.txt`);
    const klingText = script.klingPrompts
      .map(
        (p, i) =>
          `=== Scene ${i} ===\n${p.prompt}`
      )
      .join("\n\n");
    fs.writeFileSync(klingOutputPath, klingText, "utf8");
    console.log(`\n🎬 Kling prompts saved to: ${klingOutputPath}`);
  }

  return { slug, script, outputPath };
}

main().catch((err) => {
 console.error("❌ Error:", err.message);
  process.exit(1);
});