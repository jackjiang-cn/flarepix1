const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function compressVideo(src, dest, maxSizeMB, quality = 'fast') {
  const stats = fs.statSync(src);
  const sizeMB = stats.size / (1024 * 1024);

  if (sizeMB <= maxSizeMB) {
    console.log(`  ✓ ${path.basename(src)}: ${formatSize(stats.size)} — already within limit`);
    return;
  }

  // CRF 22 for quality (higher number = more compression)
  const crf = 22;
  const cmd = `ffmpeg -i "${src}" -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf ${crf} -preset ${quality} -c:a aac -b:a 128k -movflags +faststart "${dest}"`;

  console.log(`  Compressing ${path.basename(src)}: ${formatSize(stats.size)} → ...`);
  console.log(`    Target: ≤${maxSizeMB}MB, CRF ${crf}, 1080p max`);

  try {
    execSync(cmd, { stdio: 'pipe', windowsHide: true });
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    return false;
  }

  const newStats = fs.statSync(dest);
  const ratio = ((1 - newStats.size / stats.size) * 100).toFixed(1);
  console.log(`  ✓ ${formatSize(stats.size)} → ${formatSize(newStats.size)} (saved ${ratio}%)`);

  // If still over limit, compress more (lower quality)
  if (newStats.size / (1024 * 1024) > maxSizeMB) {
    console.log(`  → Still over ${maxSizeMB}MB, compressing more (CRF 25)...`);
    const backup = dest + '.bak';
    fs.copyFileSync(dest, backup);

    const harderCmd = `ffmpeg -i "${src}" -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 25 -preset fast -c:a aac -b:a 64k -movflags +faststart "${dest}.tmp"`;
    try {
      execSync(harderCmd, { stdio: 'pipe', windowsHide: true });
      fs.unlinkSync(dest);
      fs.renameSync(dest + '.tmp', dest);
      fs.unlinkSync(backup);

      const finalStats = fs.statSync(dest);
      const finalRatio = ((1 - finalStats.size / stats.size) * 100).toFixed(1);
      console.log(`  ✓ Final: ${formatSize(stats.size)} → ${formatSize(finalStats.size)} (saved ${finalRatio}%)`);
    } catch (err) {
      console.log(`  ✗ Further compression failed`);
      fs.renameSync(backup, dest);
    }
  }

  return true;
}

async function main() {
  console.log('\n🎬 Step 3: Processing real-videos/ (18 files)');
  console.log('=============================================\n');
  console.log('⚠️  This will take a while due to large file sizes\n');

  const srcDir = path.join(projectRoot, 'real-videos');
  const destDir = path.join(projectRoot, 'public', 'works', 'video');

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  // Map source files to meaningful names
  const videoMap = [
    { src: '111.1.mp4', name: 'product-demo-1.mp4' },
    { src: '15232f55-f08e-4dbf-9165-1becad552372.mp4', name: 'product-demo-2.mp4' },
    { src: '365.mp4', name: 'product-demo-3.mp4' },
    { src: '849.mov', name: 'product-demo-4.mp4' },
    { src: 'air-feeder-petlibro.mp4', name: 'pet-feeder.mp4' },
    { src: 'cap.mp4', name: 'cap-product.mp4' },
    { src: 'comb.mp4', name: 'comb-product.mp4' },
    { src: 'cycrown-ebike.mp4', name: 'ebike-brand.mp4' },
    { src: 'honeycomb-blanket.mp4', name: 'blanket-product.mp4' },
    { src: 'IMG_1357-广告片-200M.mp4', name: 'brand-ad-1.mp4' },
    { src: 'LOCK2.mp4', name: 'lock-product.mp4' },
    { src: 'medical-exoskeleton.mp4', name: 'medical-product.mp4' },
    { src: 'momcozy-bottle-cleaner.mp4', name: 'bottle-cleaner.mp4' },
    { src: 'usable-1.mp4', name: 'product-demo-5.mp4' },
    { src: 'video_1761011941085.mp4', name: 'product-demo-6.mp4' },
    { src: 'video_1761013238649.mp4', name: 'product-demo-7.mp4' },
    { src: 'VID_1520.mp4', name: 'product-demo-8.mp4' },
  ];

  let processed = 0;
  let skipped = 0;

  for (const { src, name } of videoMap) {
    const srcPath = path.join(srcDir, src);
    if (!fs.existsSync(srcPath)) {
      console.log(`  ⚠️  File not found: ${src}`);
      skipped++;
      continue;
    }

    const dest = path.join(destDir, name);
    console.log(`\n[${processed + skipped + 1}/${videoMap.length}] Processing: ${src}`);

    const result = await compressVideo(srcPath, dest, 50);
    if (result) processed++;
    else skipped++;
  }

  console.log('\n\n✅ real-videos/ processed!');
  console.log(`   Processed: ${processed}, Skipped: ${skipped}`);
  console.log('\n📊 Final video sizes in public/works/video/:');
  fs.readdirSync(destDir).filter(f => f.endsWith('.mp4')).forEach(f => {
    const size = fs.statSync(path.join(destDir, f)).size;
    const status = size / (1024 * 1024) <= 50 ? '✅' : '❌';
    console.log(`  ${status} ${f}: ${formatSize(size)}`);
  });
}

main().catch(console.error);