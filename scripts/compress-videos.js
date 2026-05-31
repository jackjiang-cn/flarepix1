const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = path.resolve(__dirname, '..');

const videos = [
  {
    src: path.join(projectRoot, 'public/works/video/cycrown.mp4'),
    dest: path.join(projectRoot, 'public/works/video/cycrown_new.mp4'),
    label: 'Brand film (limit 50MB)',
  },
  {
    src: path.join(projectRoot, 'public/works/video/momcozy.mp4'),
    dest: path.join(projectRoot, 'public/works/video/momcozy_new.mp4'),
    label: 'Brand film (limit 50MB)',
  },
  {
    src: path.join(projectRoot, 'public/works/ai/videos/ai_demo_2.mp4'),
    dest: path.join(projectRoot, 'public/works/ai/videos/ai_demo_2_new.mp4'),
    label: 'AI video (limit 20MB)',
  },
  {
    src: path.join(projectRoot, 'public/works/ai/videos/ai_demo_4.mp4'),
    dest: path.join(projectRoot, 'public/works/ai/videos/ai_demo_4_new.mp4'),
    label: 'AI video (limit 20MB)',
  },
];

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

function compressVideo(src, dest, label) {
  const originalSize = fs.statSync(src).size;
  console.log(`\n📹 ${label}`);
  console.log(`   Original: ${formatSize(originalSize)}`);

  // FFmpeg: H.264, 1080p, CRF 23, fast preset
  const cmd = `ffmpeg -i "${src}" -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k -movflags +faststart "${dest}"`;

  console.log(`   Compressing...`);

  try {
    execSync(cmd, { stdio: 'pipe', windowsHide: true });
  } catch (err) {
    console.log(`   ✗ FFmpeg error: ${err.message}`);
    return false;
  }

  if (!fs.existsSync(dest)) {
    console.log(`   ✗ Output file not created`);
    return false;
  }

  const newSize = fs.statSync(dest).size;
  const ratio = ((1 - newSize / originalSize) * 100).toFixed(1);

  console.log(`   ✓ New: ${formatSize(newSize)} (saved ${ratio}%)`);

  // Replace original
  const backupPath = src + '.bak';
  fs.copyFileSync(src, backupPath);
  fs.unlinkSync(src);
  fs.renameSync(dest, src);

  console.log(`   ✓ Replaced original (backup: ${path.basename(backupPath)})`);
  return true;
}

async function main() {
  console.log('🎬 FlarePix Video Compressor');
  console.log('============================\n');

  for (const v of videos) {
    await compressVideo(v.src, v.dest, v.label);
  }

  console.log('\n✅ All videos compressed!');
}

main().catch(console.error);