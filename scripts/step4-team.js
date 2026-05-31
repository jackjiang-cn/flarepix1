const { execSync } = require('child_process');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

async function compressImage(srcPath, destPath, maxSizeKB) {
  const stats = fs.statSync(srcPath);
  const sizeKB = stats.size / 1024;

  if (sizeKB <= maxSizeKB) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`  ✓ ${path.basename(srcPath)}: ${formatSize(stats.size)} — already within limit`);
    return;
  }

  let quality = 85;
  let width = 1200;
  let buffer;

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
  console.log(`  ✓ ${path.basename(srcPath)}: ${formatSize(stats.size)} → ${formatSize(buffer.length)} (saved ${ratio}%)`);
}

async function compressVideo(src, dest, maxSizeMB) {
  const stats = fs.statSync(src);
  const sizeMB = stats.size / (1024 * 1024);

  if (sizeMB <= maxSizeMB) {
    console.log(`  ✓ ${path.basename(src)}: ${formatSize(stats.size)} — already within limit`);
    return;
  }

  const cmd = `ffmpeg -i "${src}" -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 22 -preset fast -c:a aac -b:a 128k -movflags +faststart "${dest}"`;

  console.log(`  Compressing ${path.basename(src)}: ${formatSize(stats.size)} → ...`);
  execSync(cmd, { stdio: 'pipe', windowsHide: true });

  const newStats = fs.statSync(dest);
  const ratio = ((1 - newStats.size / stats.size) * 100).toFixed(1);
  console.log(`  ✓ ${formatSize(stats.size)} → ${formatSize(newStats.size)} (saved ${ratio}%)`);
}

async function main() {
  console.log('\n👥 Step 4: Processing our team/');
  console.log('================================\n');

  const srcDir = path.join(projectRoot, 'our team');
  const destDir = path.join(projectRoot, 'public', 'works');

  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const src = path.join(srcDir, file);
    const ext = path.extname(file).toLowerCase();

    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const dest = path.join(destDir, `team-${file.replace(ext, '.jpg')}`);
      await compressImage(src, dest, 500);
    } else if (['.mp4', '.mov', '.avi'].includes(ext)) {
      const dest = path.join(destDir, `team-${file}`);
      await compressVideo(src, dest, 50);
    }
  }

  console.log('\n✅ our team/ processed!');
}

main().catch(console.error);