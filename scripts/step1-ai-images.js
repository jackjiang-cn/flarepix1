const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

async function compressAndConvertWebp(srcPath, destPath, maxSizeKB) {
  const stats = fs.statSync(srcPath);
  const sizeKB = stats.size / 1024;

  if (sizeKB <= maxSizeKB * 1.1) {
    // Just convert to WebP
    const buffer = await sharp(srcPath)
      .toFormat('webp', { quality: 85 })
      .toBuffer();

    fs.writeFileSync(destPath, buffer);
    console.log(`  ✓ ${path.basename(srcPath)}: ${sizeKB.toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB (converted to WebP)`);
    return;
  }

  // Compress to meet size limit
  let quality = 85;
  let width = 800;
  let buffer;

  do {
    buffer = await sharp(srcPath)
      .resize(width, null, { withoutEnlargement: true })
      .toFormat('webp', { quality })
      .toBuffer();

    if (buffer.length / 1024 <= maxSizeKB || quality <= 60) break;
    quality -= 5;
    if (quality <= 60) {
      width = Math.floor(width * 0.85);
      quality = 85;
    }
  } while (buffer.length / 1024 > maxSizeKB && quality > 50 && width > 400);

  fs.writeFileSync(destPath, buffer);
  const resultKB = buffer.length / 1024;
  console.log(`  ✓ ${path.basename(srcPath)}: ${sizeKB.toFixed(0)}KB → ${resultKB.toFixed(0)}KB (width: ${width}, quality: ${quality})`);
}

async function main() {
  console.log('🖼 Step 1: Processing ai-images/');
  console.log('================================\n');

  const srcDir = path.join(projectRoot, 'ai-images');
  const destDir = path.join(projectRoot, 'public', 'works', 'ai', 'images');

  // Ensure destination exists
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  // Clean existing webp files in dest
  fs.readdirSync(destDir).filter(f => f.endsWith('.webp')).forEach(f => {
    fs.unlinkSync(path.join(destDir, f));
  });

  for (let i = 0; i < files.length; i++) {
    const srcPath = path.join(srcDir, files[i]);
    const destName = `ai_product_${i + 7}.webp`; // Start from 7 to avoid conflict
    const destPath = path.join(destDir, destName);

    await compressAndConvertWebp(srcPath, destPath, 150);
  }

  console.log('\n✅ ai-images/ processed!');
  console.log('\n📊 Final sizes:');
  fs.readdirSync(destDir).filter(f => f.endsWith('.webp')).forEach(f => {
    const sizeKB = fs.statSync(path.join(destDir, f)).size / 1024;
    console.log(`  ✅ ${f}: ${sizeKB.toFixed(0)}KB`);
  });
}

main().catch(console.error);