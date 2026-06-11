/**
 * Step 4: Compile multi-aspect-ratio videos with FFmpeg
 *
 * Reads:
 *   - ${slug}.script.json (scene timing + narration)
 *   - ${slug}.mp3 (TTS audio from step2)
 *   - kling-prompts/scene_0.mp4, scene_1.mp4, ... (Kling video clips)
 *
 * Outputs to:
 *   - output/16x9/${slug}.mp4
 *   - output/9x16/${slug}.mp4
 *   - output/1x1/${slug}.mp4
 *
 * Each output has:
 *   - Concatenated video clips (padded/cropped to aspect ratio)
 *   - TTS audio track
 *   - Subtitles (from narration text)
 *   - FlarePix logo watermark (bottom-right, 80% opacity)
 *
 * Usage: node step4-compile.js <slug>
 */

const fs = require("fs");
const path = require("path");
const { execSync, exec } = require("child_process");
const util = require("util");

const execPromise = util.promisify(exec);

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const PIPELINE_DIR = __dirname;
const OUTPUT_DIR = path.join(PIPELINE_DIR, "output");
const KLING_DIR = path.join(PIPELINE_DIR, "kling-prompts");
const SCRIPT_PATH = path.join(PIPELINE_DIR, "step1-script.js");
// ─────────────────────────────────────────────────────────────────────────

/**
 * Check if FFmpeg is available and return version string.
 */
function checkFFmpeg() {
  try {
    const v = execSync("ffmpeg -version", { encoding: "utf8" });
    const match = v.match(/ffmpeg version (\S+)/);
    return match ? match[1] : "unknown";
  } catch {
    return null;
  }
}

/**
 * Ensure output subdirectory exists.
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Build SRT subtitle file from scenes + total audio duration.
 * Returns path to the .srt file created.
 */
function buildSubtitles(scenes, totalDurationSec, outputDir) {
  // Distribute total duration across scenes proportionally by word count
  const sceneWords = scenes.map((s) =>
    (s.narration || "").split(/\s+/).filter(Boolean).length
  );
  const totalWords = sceneWords.reduce((a, b) => a + b, 0);
  const wordsPerSec = totalWords / totalDurationSec;

  let srtContent = "";
  let subtitleIndex = 1;
  let accumulatedTime = 0;

  scenes.forEach((scene, sceneIdx) => {
    const words = sceneWords[sceneIdx];
    const duration = words / wordsPerSec;
    const narration = scene.narration || "";
    const lines = narration.split(/\n/).filter(Boolean);

    // Split long narration into subtitle lines (~10 words per line)
    const MAX_WORDS_PER_LINE = 12;
    const subtitleLines = [];
    let currentLine = [];

    lines.forEach((line) => {
      const lineWords = line.split(/\s+/).filter(Boolean);
      lineWords.forEach((word) => {
        currentLine.push(word);
        if (currentLine.length >= MAX_WORDS_PER_LINE) {
          subtitleLines.push(currentLine.join(" "));
          currentLine = [];
        }
      });
      if (currentLine.length > 0) {
        subtitleLines.push(currentLine.join(" "));
        currentLine = [];
      }
    });

    const lineDuration = duration / Math.max(subtitleLines.length, 1);

    subtitleLines.forEach((lineText, lineIdx) => {
      const startSec = accumulatedTime + lineIdx * lineDuration;
      const endSec = startSec + lineDuration - 0.1;

      const toSrtTime = (sec) => {
        const h = Math.floor(sec / 3600);
        const m = Math.floor((sec % 3600) / 60);
        const s = Math.floor(sec % 60);
        const ms = Math.round((sec % 1) * 1000);
        return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
      };

      srtContent += `${subtitleIndex}\n`;
      srtContent += `${toSrtTime(startSec)} --> ${toSrtTime(endSec)}\n`;
      srtContent += `${lineText}\n\n`;
      subtitleIndex++;
    });

    accumulatedTime += duration;
  });

  const srtPath = path.join(outputDir, "temp_subtitles.srt");
  fs.writeFileSync(srtPath, srtContent, "utf8");
  return srtPath;
}

/**
 * Get duration of an MP3 or video file using FFmpeg.
 */
async function getMediaDuration(filePath) {
  try {
    const out = await execPromise(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`,
      { encoding: "utf8" }
    );
    return parseFloat(out.stdout.trim()) || 0;
  } catch {
    return 0;
  }
}

/**
 * Get duration of MP3 audio file.
 */
async function getAudioDuration(mp3Path) {
  try {
    const out = await execPromise(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mp3Path}"`,
      { encoding: "utf8" }
    );
    return parseFloat(out.stdout.trim()) || 0;
  } catch {
    return 0;
  }
}

/**
 * Run FFmpeg command, throw on error.
 */
async function runFFmpeg(cmd, label) {
  console.log(`   ${label}...`);
  try {
    await execPromise(cmd, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
  } catch (e) {
    throw new Error(`${label} failed: ${e.message}`);
  }
}

/**
 * Compile one aspect ratio version.
 * Strategy:
 *   - Concatenate all scene clips
 *   - Trim audio to match video
 *   - Overlay logo watermark
 *   - Hardcode subtitles
 *   - Scale/pad to target resolution
 */
async function compileRatio(slug, mp3Path, srtPath, clipPaths, targetWidth, targetHeight, label, outputSubDir) {
  ensureDir(outputSubDir);
  const outputPath = path.join(outputSubDir, `${slug}.mp4`);

  // Filter out missing clips
  const validClips = clipPaths.filter((p) => p && fs.existsSync(p));
  if (validClips.length === 0) {
    throw new Error("No valid video clips found. Please generate Kling clips first.");
  }

  // Step 1: Concat all clips into one intermediate file
  const concatListPath = path.join(outputSubDir, "concat_list.txt");
  const concatList = validClips.map((p) => `file '${p}'`).join("\n");
  fs.writeFileSync(concatListPath, concatList, "utf8");
  const concatPath = path.join(outputSubDir, "temp_concat.mp4");

  await runFFmpeg(
    `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c:v libx264 -crf 23 -preset fast -an "${concatPath}"`,
    "Concatenating clips"
  );

  // Step 2: Get actual video and audio durations
  const videoDuration = await getMediaDuration(concatPath);
  const audioDuration = await getAudioDuration(mp3Path);
  const useDuration = Math.min(videoDuration, audioDuration);

  // Step 3: Add audio + logo + subtitles + scale to target resolution
  const logoPath = path.join(PIPELINE_DIR, "..", "..", "public", "logo", "flarepix-logo-800.png");

  let cmd = `ffmpeg -y `;

  // Input: concatenated video
  cmd += `-i "${concatPath}" `;

  // Input: audio
  cmd += `-i "${mp3Path}" `;

  // Input: subtitles (only if SRT exists)
  if (fs.existsSync(srtPath)) {
    cmd += `-i "${srtPath}" `;
  }

  // Input: logo (only if it exists)
  if (fs.existsSync(logoPath)) {
    cmd += `-i "${logoPath}" `;
  }

  // Video filter: scale/pad to target resolution + logo overlay + subtitles
  const filters = [
    // Scale video to fill target, then pad to exact dimensions (center)
    `scale=${targetWidth}:${targetHeight}:force_original_aspect_ratio=increase`,
    `crop=${targetWidth}:${targetHeight}`,
    `pad=${targetWidth}:${targetHeight}:(ow-iw)/2:(oh-ih)/2:black@0`,
  ];

  let filterComplex = filters.join(",");

  // Add logo overlay if logo exists
  if (fs.existsSync(logoPath)) {
    // logo: place at bottom-right, 10% of video height, maintain aspect ratio
    const logoH = Math.round(targetHeight * 0.08);
    const logoW = Math.round(logoH * (800 / 240)); // original logo aspect ~3.3:1
    const logoX = targetWidth - logoW - Math.round(targetWidth * 0.02);
    const logoY = targetHeight - logoH - Math.round(targetHeight * 0.02);
    filterComplex += `,overlay=W-w-${Math.round(targetWidth * 0.02)}:H-h-${Math.round(targetHeight * 0.02)}`;
  }

  // Build the full output command
  cmd += `-filter_complex "${filterComplex}" `;
  cmd += `-map "[v]" `;

  // Map audio (trimmed to video duration)
  cmd += `-map1:a -c:a aac -b:a 128k -shortest `;

  // Subtitles stream (if SRT exists)
  if (fs.existsSync(srtPath)) {
    cmd += `-c:s mov_text -metadata:s:s language=eng `;
  }

  cmd += `-c:v libx264 -crf 22 -preset medium -r 30 `;
  cmd += `-map0:v? `; // ignore original audio from concat

  cmd += `"${outputPath}"`;

  await runFFmpeg(cmd, `Encoding ${label} (${targetWidth}x${targetHeight})`);

  // Clean up temp concat file
  try {
    fs.unlinkSync(concatPath);
    fs.unlinkSync(concatListPath);
  } catch {}

  return outputPath;
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node step4-compile.js <slug>");
    process.exit(1);
  }

  // Check FFmpeg
  const ffmpegVersion = checkFFmpeg();
  if (!ffmpegVersion) {
    console.error("❌ FFmpeg not found. Install FFmpeg first:");
    console.error("   Windows: winget install FFmpeg");
    console.error("   Mac: brew install ffmpeg");
    console.error("   Linux: sudo apt install ffmpeg");
    process.exit(1);
  }
  console.log(`\n🎬 Step 4: Compiling videos for "${slug}"...`);
  console.log(`   FFmpeg version: ${ffmpegVersion}\n`);

  // Load script
  const scriptPath = path.join(PIPELINE_DIR, `${slug}.script.json`);
  if (!fs.existsSync(scriptPath)) {
    console.error(`❌ Script not found: ${scriptPath}`);
    console.error("Run step1-script.js first.");
    process.exit(1);
  }
  const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
  const scenes = script.scenes;

  // Load MP3
  const mp3Path = path.join(PIPELINE_DIR, `${slug}.mp3`);
  if (!fs.existsSync(mp3Path)) {
    console.error(`❌ MP3 not found: ${mp3Path}`);
    console.error("Run step2-tts.js first.");
    process.exit(1);
  }

  // Find Kling video clips
  const clipPaths = [];
  for (let i = 0; i < scenes.length; i++) {
    const clipPath = path.join(KLING_DIR, `scene_${i}.mp4`);
    if (fs.existsSync(clipPath)) {
      clipPaths.push(clipPath);
      console.log(`   Found clip ${i}: scene_${i}.mp4`);
    } else {
      // Try without index (just slug)
      const altPath = path.join(KLING_DIR, `${slug}_scene_${i}.mp4`);
      if (fs.existsSync(altPath)) {
        clipPaths.push(altPath);
        console.log(`   Found clip ${i}: ${slug}_scene_${i}.mp4`);
      } else {
        clipPaths.push(null);
        console.log(`   ⚠ Missing clip ${i}: scene_${i}.mp4 — place in kling-prompts/`);
      }
    }
  }

  const missingClips = clipPaths.filter((p) => !p).length;
  if (missingClips > 0) {
    console.error(`\n❌ ${missingClips} video clip(s) missing. Please generate Kling clips and place in:`);
    console.error(`   ${KLING_DIR}/`);
    console.error(`   Expected filenames: scene_0.mp4, scene_1.mp4, ... scene_${scenes.length - 1}.mp4`);
    console.error("\nRun: node run.js", slug, "to see which clips are needed.");
    process.exit(1);
  }

  // Get audio duration
  const audioDuration = await getAudioDuration(mp3Path);
  console.log(`   Audio duration: ${Math.round(audioDuration / 60)}min ${Math.round(audioDuration % 60)}s`);
  console.log(`   Scenes: ${clipPaths.length}\n`);

  // Build subtitles
  console.log("Building subtitles...");
  const srtPath = buildSubtitles(scenes, audioDuration, OUTPUT_DIR);
  console.log(`   Subtitles saved.\n`);

  // Compile3 aspect ratios
  const results = [];

  // 16:9 YouTube
  const r1 = await compileRatio(
    slug, mp3Path, srtPath, clipPaths,
    1920, 1080, "YouTube 16:9",
    path.join(OUTPUT_DIR, "16x9")
  );
  results.push({ label: "16:9 (YouTube)", path: r1 });

  // 9:16 TikTok / Shorts
  const r2 = await compileRatio(
    slug, mp3Path, srtPath, clipPaths,
    1080, 1920, "TikTok/Shorts 9:16",
    path.join(OUTPUT_DIR, "9x16")
  );
  results.push({ label: "9:16 (TikTok/Shorts)", path: r2 });

  // 1:1 LinkedIn / Instagram
  const r3 = await compileRatio(
    slug, mp3Path, srtPath, clipPaths,
    1080, 1080, "LinkedIn/IG 1:1",
    path.join(OUTPUT_DIR, "1x1")
  );
  results.push({ label: "1:1 (LinkedIn/IG)", path: r3 });

  // Clean up temp SRT
  try { fs.unlinkSync(srtPath); } catch {}

  // Summary
  console.log("\n✅ All videos compiled successfully!\n");
  console.log("   OUTPUT FILES:");
  results.forEach(({ label, path: p }) => {
    const sizeMB = Math.round(fs.statSync(p).size / (1024 * 1024) * 10) / 10;
    console.log(`   ${label}: ${p} (${sizeMB} MB)`);
  });
}

main().catch((err) => {
  console.error("\n❌ Error:", err.message);
  process.exit(1);
});