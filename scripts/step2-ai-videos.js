const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function compressVideo(src, dest, maxSizeMB) {
  const stats = fs.statSync(src);
  const sizeMB = stats.size / (1024 * 1024);

  if (sizeMB <= maxSizeMB) {
    console.log(`  ✓ ${path.basename(src)}: ${formatSize(stats.size)} — already within limit`);
    return;
  }

  // CRF 22-23 for quality, target bitrate
  const cmd = `ffmpeg -i "${src}" -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k -movflags +faststart "${dest}"`;

  console.log(`  Compressing ${path.basename(src)}: ${formatSize(stats.size)} → ...`);
  console.log(`    (CRF 23, 1080p max)`);

  execSync(cmd, { stdio: 'pipe', windowsHide: true });

  const newStats = fs.statSync(dest);
  const ratio = ((1 - newStats.size / stats.size) * 100).toFixed(1);
  console.log(`  ✓ ${path.basename(dest)}: ${formatSize(stats.size)} → ${formatSize(newStats.size)} (saved ${ratio}%)`);

  // Check if still over limit, try higher compression
  if (newStats.size / (1024 * 1024) > maxSizeMB) {
    console.log(`  → Still over limit, compressing more...`);
    const backup = dest + '.bak';
    fs.copyFileSync(dest, backup);

    const harderCmd = `ffmpeg -i "${src}" -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 64k -movflags +faststart "${dest}.tmp"`;
    execSync(harderCmd, { stdio: 'pipe', windowsHide: true });

    fs.unlinkSync(dest);
    fs.renameSync(dest + '.tmp', dest);
    fs.unlinkSync(backup);

    const finalStats = fs.statSync(dest);
    const finalRatio = ((1 - finalStats.size / stats.size) * 100).toFixed(1);
    console.log(`  ✓ Final: ${formatSize(stats.size)} → ${formatSize(finalStats.size)} (saved ${finalRatio}%)`);
  }
}

async function main() {
  console.log('\n🎬 Step 2: Processing ai-videos/');
  console.log('==================================\n');

  const srcDir = path.join(projectRoot, 'ai-videos');
  const destDir = path.join(projectRoot, 'public', 'works', 'ai', 'videos');

  // Clean existing mp4 in dest
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  fs.readdirSync(destDir).filter(f => f.endsWith('.mp4')).forEach(f => {
    fs.unlinkSync(path.join(destDir, f));
  });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.mp4') || f.endsWith('.mov'));

  for (let i = 0; i < files.length; i++) {
    const src = path.join(srcDir, files[i]);
    const dest = path.join(destDir, `ai_demo_${i + 5}.mp4`);
    await compressVideo(src, dest, 15);
  }

  console.log('\n✅ ai-videos/ processed!');
  console.log('\n📊 Final sizes:');
  fs.readdirSync(destDir).filter(f => f.endsWith('.mp4')).forEach(f => {
    const size = fs.statSync(path.join(destDir, f)).size;
    console.log(`  ✅ ${f}: ${formatSize(size)}`);
  });
}

main().catch(console.error);