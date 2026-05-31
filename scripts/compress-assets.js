const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Resolve project root (two levels up from scripts/)
const projectRoot = path.resolve(__dirname, '..');

// Spec limits
const SPECS = {
  'photo/real': { maxWidth: 1200, maxSizeKB: 500, format: 'jpeg' },
  'ai/images': { maxWidth: 800, maxSizeKB: 200, format: 'webp' },
};

async function compressImage(srcPath, destPath, spec) {
  const stats = fs.statSync(srcPath);
  const sizeKB = stats.size / 1024;

  // Skip if already small enough
  if (sizeKB <= spec.maxSizeKB * 1.1) {
    console.log(`  ✓ ${path.basename(srcPath)} (${sizeKB.toFixed(0)}KB) — already small enough`);
    return { skipped: true };
  }

  let quality = 85;
  let width = spec.maxWidth;
  let buffer;

  do {
    buffer = await sharp(srcPath)
      .resize(width, null, { withoutEnlargement: true })
      .toFormat(spec.format, { quality })
      .toBuffer();

    const currentKB = buffer.length / 1024;
    if (currentKB <= spec.maxSizeKB || quality <= 40) break;

    quality -= 10;
    if (quality <= 40) {
      width = Math.floor(width * 0.8);
      quality = 85;
    }
  } while (buffer.length > spec.maxSizeKB * 1024 && quality > 30 && width > 200);

  const resultKB = buffer.length / 1024;

  // Write to temp file first, then replace
  const tempPath = destPath + '.tmp';
  fs.writeFileSync(tempPath, buffer);

  // Replace original with compressed version
  fs.unlinkSync(srcPath);
  fs.renameSync(tempPath, destPath);

  console.log(`  ✓ ${path.basename(destPath)}: ${sizeKB.toFixed(0)}KB → ${resultKB.toFixed(0)}KB (quality: ${quality}, width: ${width})`);
  return { compressed: true, originalKB: sizeKB, newKB: resultKB };
}

async function processImageFolder(relativeDir, spec) {
  const dir = path.join(projectRoot, 'public', 'works', relativeDir);
  if (!fs.existsSync(dir)) {
    console.log(`\n⚠ Directory not found: ${relativeDir}`);
    return;
  }

  console.log(`\n📁 Processing ${relativeDir}/`);
  const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  let processed = 0, skipped = 0;

  for (const file of files) {
    const srcPath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    // Output with correct format extension
    const outName = spec.format === 'jpeg'
      ? `${baseName}.jpg`
      : `${baseName}.webp`;
    const destPath = path.join(dir, outName);

    // Skip if already correct format and small enough
    if (ext === '.' + spec.format && fs.statSync(srcPath).size / 1024 <= spec.maxSizeKB * 1.1) {
      console.log(`  ✓ ${file} — already optimal format and size`);
      skipped++;
      continue;
    }

    try {
      const result = await compressImage(srcPath, destPath, spec);
      if (result.compressed) processed++;
    } catch (err) {
      console.log(`  ✗ Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`  → ${processed} compressed, ${skipped} skipped`);
}

async function main() {
  console.log('🖼 FlarePix Asset Compressor');
  console.log('==========================\n');

  let totalCompressed = 0;
  let totalSkipped = 0;

  for (const [dir, spec] of Object.entries(SPECS)) {
    const result = await processImageFolder(dir, spec);
    totalCompressed++;
    totalSkipped++;
  }

  console.log('\n✅ Image compression complete!');

  // Show file sizes after compression
  console.log('\n📊 Final file sizes:');
  const dirs = [
    ['photo/real', '.jpg'],
    ['ai/images', '.webp'],
  ];

  for (const [relativeDir, ext] of dirs) {
    const dir = path.join(projectRoot, 'public', 'works', relativeDir);
    if (fs.existsSync(dir)) {
      console.log(`\n  ${relativeDir}/`);
      fs.readdirSync(dir)
        .filter(f => f.endsWith(ext))
        .forEach(f => {
          const sizeKB = fs.statSync(path.join(dir, f)).size / 1024;
          const status = sizeKB <= SPECS[relativeDir].maxSizeKB ? '✅' : '❌';
          console.log(`    ${status} ${f}: ${sizeKB.toFixed(0)}KB`);
        });
    }
  }

  console.log('\n📹 Video compression (needs FFmpeg):');
  console.log('----------------------------------');
  console.log('Install FFmpeg: winget install ffmpeg');
  console.log('Or download from: https://ffmpeg.org/download.html');
  console.log('\nOr use HandBrake GUI: https://handbrake.fr/');
  console.log('Settings: H.264, 1080p, Quality RF 22-23, ~6Mbps bitrate');

  console.log('\n⚠ Videos still exceeding limits:');
  const videoDir = path.join(projectRoot, 'public', 'works', 'video');
  const aiVideoDir = path.join(projectRoot, 'public', 'works', 'ai', 'videos');

  for (const [vd, limit] of [[videoDir, 50], [aiVideoDir, 20]]) {
    if (fs.existsSync(vd)) {
      fs.readdirSync(vd).filter(f => f.endsWith('.mp4')).forEach(f => {
        const sizeMB = fs.statSync(path.join(vd, f)).size / (1024 * 1024);
        if (sizeMB > limit) {
          console.log(`  ❌ ${f}: ${sizeMB.toFixed(0)}MB (limit: ${limit}MB)`);
        }
      });
    }
  }
}

main().catch(console.error);