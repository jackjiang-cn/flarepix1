import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "public", "works");
const outDir = path.join(__dirname, "..", "public", "works", "compressed");

// Ensure output dir exists
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const images = [
  { src: "photo/womens-fashion/womens-fashion_1.jpg", maxKB: 80 },
  { src: "photo/kids/kids_1.jpg", maxKB: 80 },
  { src: "photo/mens/mens_1.jpg", maxKB: 80 },
  { src: "ai/images/ai-image-03.webp", maxKB: 50 },
  { src: "ai/images/ai-image-04.webp", maxKB: 50 },
  { src: "ai/images/ai-image-06.webp", maxKB: 50 },
];

for (const img of images) {
  const inputPath = path.join(srcDir, img.src);
  const outputPath = path.join(outDir, path.basename(img.src));
  const info = await sharp(inputPath).metadata();
  const originalKB = Math.round(info.size / 1024);

  // Compress to JPEG or WebP based on input
  const isWebP = img.src.endsWith(".webp");
  let pipeline = sharp(inputPath).resize(1200, null, { withoutEnlargement: true });

  if (isWebP) {
    await pipeline.webp({ quality: 75 }).toFile(outputPath);
  } else {
    await pipeline.jpeg({ quality: 75, progressive: true }).toFile(outputPath);
  }

  const compressed = fs.statSync(outputPath);
  const compressedKB = Math.round(compressed.size / 1024);
  const saved = originalKB - compressedKB;
  console.log(`${img.src}: ${originalKB}KB → ${compressedKB}KB (saved ${saved}KB)`);
}

console.log(`\nCompressed images saved to: ${outDir}`);