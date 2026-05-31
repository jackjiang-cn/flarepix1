const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

function formatSize(bytes) {
  return (bytes / 1024).toFixed(0) + 'KB';
}

const categoryMap = {
  'Accessories': 'accessories',
  'kid product': 'kids',
  "Men's": 'mens',
  'Other products': 'other',
  'Product Image': 'products',
  "Women's clothing": 'womens-clothing',
  "Women's underwear": 'womens-underwear',
};

async function compressImage(srcPath, destPath, maxSizeKB) {
  const stats = fs.statSync(srcPath);
  const sizeKB = stats.size / 1024;

  if (sizeKB <= maxSizeKB && path.extname(srcPath).toLowerCase() === '.jpg') {
    fs.copyFileSync(srcPath, destPath);
    return { action: 'copied', sizeKB };
  }

  let quality = 85;
  let width = 1200;
  let buffer;

  try {
    do {
      buffer = await sharp(srcPath)
        .resize(width, null, { withoutEnlargement: true })
        .toFormat('jpeg', { quality })
        .toBuffer();

      if (buffer.length / 1024 <= maxSizeKB || quality <= 60) break;
      quality -= 5;
      if (quality <= 60) {
        width = Math.floor(width * 0.85);
        quality = 85;
      }
    } while (buffer.length / 1024 > maxSizeKB && quality > 50 && width > 400);

    fs.writeFileSync(destPath, buffer);
    const ratio = ((1 - buffer.length / stats.size) * 100).toFixed(1);
    return { action: 'compressed', originalKB: sizeKB, newKB: buffer.length / 1024, ratio };
  } catch (err) {
    console.log(`    ✗ Error: ${err.message}`);
    return { action: 'error', error: err.message };
  }
}

async function main() {
  console.log('\n📸 Step 5: Processing real-photos/');
  console.log('==================================\n');

  const srcDir = path.join(projectRoot, 'real-photos');
  const destBaseDir = path.join(projectRoot, 'public', 'works', 'photo');

  let totalProcessed = 0;
  let totalCopied = 0;
  let totalSkipped = 0;

  // Process each category folder
  for (const [folderName, category] of Object.entries(categoryMap)) {
    const categoryDir = path.join(srcDir, folderName);
    const destDir = path.join(destBaseDir, category);

    if (!fs.existsSync(categoryDir)) {
      console.log(`⚠️  Folder not found: ${folderName}`);
      continue;
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`\n📁 Processing: ${folderName} → ${category}/`);

    const files = fs.readdirSync(categoryDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    let processed = 0;
    let copied = 0;
    let skipped = 0;

    for (let i = 0; i < files.length; i++) {
      const src = path.join(categoryDir, files[i]);
      const dest = path.join(destDir, `${category}_${i + 1}.jpg`);

      const result = await compressImage(src, dest, 800);

      if (result.action === 'compressed') {
        console.log(`    ✓ ${files[i]}: ${result.originalKB.toFixed(0)}KB → ${result.newKB.toFixed(0)}KB`);
        processed++;
      } else if (result.action === 'copied') {
        console.log(`    ✓ ${files[i]}: copied (${result.sizeKB.toFixed(0)}KB)`);
        copied++;
      } else {
        console.log(`    ✗ ${files[i]}: ${result.error}`);
        skipped++;
      }
    }

    console.log(`    → ${processed} compressed, ${copied} copied, ${skipped} skipped`);
    totalProcessed += processed;
    totalCopied += copied;
    totalSkipped += skipped;
  }

  // Process root level files
  console.log('\n📁 Processing: real-photos/ root files');
  const rootFiles = fs.readdirSync(srcDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f) && fs.statSync(path.join(srcDir, f)).isFile());

  if (rootFiles.length > 0) {
    const destDir = path.join(destBaseDir, 'misc');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    for (let i = 0; i < rootFiles.length; i++) {
      const src = path.join(srcDir, rootFiles[i]);
      const dest = path.join(destDir, `misc_${i + 1}.jpg`);

      const result = await compressImage(src, dest, 800);
      if (result.action !== 'error') {
        console.log(`    ✓ ${rootFiles[i]}`);
        totalProcessed++;
      }
    }
  }

  console.log('\n\n✅ real-photos/ organized!');
  console.log(`   Total: ${totalProcessed} compressed, ${totalCopied} copied, ${totalSkipped} skipped`);

  // Summary by category
  console.log('\n📊 Final file counts:');
  for (const [, category] of Object.entries(categoryMap)) {
    const categoryDir = path.join(destBaseDir, category);
    if (fs.existsSync(categoryDir)) {
      const count = fs.readdirSync(categoryDir).filter(f => f.endsWith('.jpg')).length;
      let totalKB = 0;
      fs.readdirSync(categoryDir).filter(f => f.endsWith('.jpg')).forEach(f => {
        totalKB += fs.statSync(path.join(categoryDir, f)).size / 1024;
      });
      console.log(`  ✅ ${category}/: ${count} files (${(totalKB/1024).toFixed(1)}MB total)`);
    }
  }
}

main().catch(console.error);