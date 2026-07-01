// Compress + rename new category photos for R2 upload.
// One-off: reads public/works/photo/new photo7.1/<folder>, outputs _compressed_new/<slug>/<slug>_N.jpg
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile } from "fs/promises";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import path from "path";

const ROOT = "public/works/photo/new photo7.1";
const OUT = "public/works/photo/_compressed_new";
const MAX_DIM = 1400;
const TARGET_KB = 80;

// source folder -> category slug
const FOLDER_TO_SLUG = {
  accessories: "accessories",
  products: "products",
  other: "other",
  "Home & Lifestyle": "other", // "other" category label is "Home & Lifestyle" -> merge
};

const SKIP = /^products_\d+\.(jpg|jpeg|png)$/i; // old already-compressed products_1..5

const counters = {};
const seenHash = new Set();
const dupes = [];
const results = {};
const overTarget = [];

const hashFile = (p) =>
  createHash("md5").update(readFileSync(p)).digest("hex");

async function compress(srcPath, dstPath) {
  let img = sharp(srcPath).rotate();
  const meta = await img.metadata();
  if (meta.width > MAX_DIM || meta.height > MAX_DIM) {
    img = img.resize({
      width: MAX_DIM,
      height: MAX_DIM,
      fit: "inside",
      withoutEnlargement: true,
    });
  }
  let quality = 80;
  let buf;
  for (let i = 0; i < 8; i++) {
    buf = await img.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
    if (buf.length <= TARGET_KB * 1024) break;
    quality -= 8;
    if (quality < 18) {
      quality = 18;
      buf = await img.clone().jpeg({ quality, mozjpeg: true }).toBuffer();
      break;
    }
  }
  await writeFile(dstPath, buf);
  return buf.length;
}

for (const [folder, slug] of Object.entries(FOLDER_TO_SLUG)) {
  let files;
  try {
    files = await readdir(path.join(ROOT, folder));
  } catch {
    console.log(`(skip missing folder: ${folder})`);
    continue;
  }
  results[slug] ??= { files: [], origKB: 0, newKB: 0 };
  counters[slug] ??= 1;
  await mkdir(path.join(OUT, slug), { recursive: true });

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    if (SKIP.test(file)) continue;
    const src = path.join(ROOT, folder, file);
    const h = hashFile(src);
    if (seenHash.has(h)) {
      dupes.push(`${folder}/${file}`);
      continue;
    }
    seenHash.add(h);
    const origBytes = (await stat(src)).size;
    const n = counters[slug]++;
    const dst = path.join(OUT, slug, `${slug}_${n}.jpg`);
    const newBytes = await compress(src, dst);
    const toKB = Math.round(newBytes / 1024);
    if (toKB > TARGET_KB)
      overTarget.push(`${slug}_${n}.jpg (${toKB}KB, from ${folder}/${file})`);
    results[slug].files.push({
      name: `${slug}_${n}.jpg`,
      from: `${folder}/${file}`,
      fromKB: Math.round(origBytes / 1024),
      toKB,
    });
    results[slug].origKB += Math.round(origBytes / 1024);
    results[slug].newKB += toKB;
  }
}

console.log("\n========== 压缩结果 ==========");
for (const [slug, r] of Object.entries(results)) {
  console.log(
    `\n[${slug}] ${r.files.length} 张 | ` +
      `原始 ${(r.origKB / 1024).toFixed(1)} MB → 压后 ${(r.newKB / 1024).toFixed(1)} KB | ` +
      `平均 ${Math.round(r.newKB / r.files.length)} KB/张`
  );
  for (const f of r.files) {
    const flag = f.toKB > TARGET_KB ? " ⚠️超" : "";
    console.log(`  ${f.name.padEnd(22)} ${String(f.fromKB).padStart(6)}KB → ${String(f.toKB).padStart(4)}KB${flag}  ← ${f.from}`);
  }
}
console.log(`\n去重(跳过): ${dupes.length} 张`);
dupes.forEach((d) => console.log(`  - ${d}`));
console.log(`\n超过 80KB 目标的: ${overTarget.length} 张`);
overTarget.forEach((o) => console.log(`  - ${o}`));
console.log(`\n输出目录: ${OUT}/`);
