/**
 * FlarePix Video Pipeline — Main Entry Point
 *
 * Orchestrates the full pipeline:
 *   Step 1 → Step 2 → (user generates Kling clips) → Step 4
 *
 * Usage:
 *   node run.js <slug> — Run full pipeline for one blog post
 *   node run.js --list — List available blog slugs
 *   node run.js --status<slug>       — Show pipeline status for a slug
 *
 * Environment variables (set in .env.local or export):
 *   ANTHROPIC_API_KEY    — Claude API key
 *   ELEVENLABS_API_KEY   — ElevenLabs API key
 *   ELEVENLABS_VOICE_ID  — ElevenLabs voice ID (optional)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const PIPELINE_DIR = __dirname;
const KLING_DIR = path.join(PIPELINE_DIR, "kling-prompts");
const OUTPUT_DIR = path.join(PIPELINE_DIR, "output");
const CONFIG_PATH = path.join(PIPELINE_DIR, "config.local.js");

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    return require(CONFIG_PATH);
  }
  // Fall back to env vars
  return {
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
    elevenlabsApiKey: process.env.ELEVENLABS_API_KEY || "",
    elevenlabsVoiceId: process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsdWDwmVDXI8z8",
    pipeline: { pauseAfterScript: true, confirmTTS: true, confirmCompile: true },
  };
}

function getBlogSlugs() {
  const content = fs.readFileSync(
    path.resolve(PIPELINE_DIR, "../../src/config/blog-posts.ts"),
    "utf8"
  );
  const slugs = [];
  const regex = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    slugs.push(m[1]);
  }
  return [...new Set(slugs)];
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question + " (y/n): ", (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

function askMultipleChoice(question, options) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    console.log(`\n${question}`);
    options.forEach((opt, i) => console.log(`  ${i + 1}. ${opt}`));
    rl.question(`Choice (1-${options.length}): `, (answer) => {
      rl.close();
      const idx = parseInt(answer.trim()) - 1;
      resolve(idx >= 0 && idx < options.length ? options[idx] : options[0]);
    });
  });
}

function runStep(stepScript, slug, label) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`▶ ${label}`);
  console.log("─".repeat(60));
  try {
    execSync(`node "${path.join(PIPELINE_DIR, stepScript)}" "${slug}"`, {
      cwd: PIPELINE_DIR,
      stdio: "inherit",
    });
    return true;
  } catch (e) {
    return false;
  }
}

function printScriptPreview(slug) {
  const scriptPath = path.join(PIPELINE_DIR, `${slug}.script.json`);
  if (!fs.existsSync(scriptPath)) return null;
  const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
  console.log("\n📝 SCRIPT PREVIEW");
  console.log("═".repeat(60));
  console.log(`Title: ${script.title}`);
  console.log(`\nScenes (${script.scenes.length}):`);
  script.scenes.forEach((s, i) => {
    console.log(` [${s.time}] ${s.type.toUpperCase()}`);
    console.log(`  Visual: ${s.visual}`);
    console.log(`  Narration: ${s.narration.substring(0, 80)}${s.narration.length > 80 ? "..." : ""}`);
    console.log();
  });
  return script;
}

function printKlingPrompts(slug) {
  const klingPath = path.join(KLING_DIR, `${slug}.kling-prompts.txt`);
  if (!fs.existsSync(klingPath)) {
    // Also check step1 output
    const scriptPath = path.join(PIPELINE_DIR, `${slug}.script.json`);
    if (!fs.existsSync(scriptPath)) return;
    const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
    if (!script.klingPrompts) return;
    console.log("\n🎬 KLING PROMPTS (copy each to kling.klingai.com)");
    console.log("═".repeat(60));
    script.klingPrompts.forEach((p, i) => {
      console.log(`\n--- Scene ${i} ---`);
      console.log(p.prompt);
    });
    return;
  }
  const content = fs.readFileSync(klingPath, "utf8");
  console.log("\n🎬 KLING PROMPTS");
  console.log("═".repeat(60));
  console.log(content);
}

function checkPipelineStatus(slug) {
  const scriptExists = fs.existsSync(path.join(PIPELINE_DIR, `${slug}.script.json`));
  const mp3Exists = fs.existsSync(path.join(PIPELINE_DIR, `${slug}.mp3`));
  const script = scriptExists
    ? JSON.parse(fs.readFileSync(path.join(PIPELINE_DIR, `${slug}.script.json`), "utf8"))
    : null;
  const sceneCount = script?.scenes?.length || 0;

  // Check Kling clips
  const klingClips = [];
  for (let i = 0; i < sceneCount; i++) {
    const clipPath = path.join(KLING_DIR, `scene_${i}.mp4`);
    klingClips.push(fs.existsSync(clipPath));
  }

  console.log(`\n📊 Pipeline status for: ${slug}`);
  console.log("═".repeat(60));
  console.log(`  Step 1 (Script):     ${scriptExists ? "✅ done" : "❌ missing"}`);
  console.log(`  Step 2 (TTS MP3):     ${mp3Exists ? "✅ done" : "❌ missing"}`);
  console.log(`  Step 3 (Kling clips): ${klingClips.filter(Boolean).length}/${sceneCount} generated`);
  if (sceneCount > 0) {
    console.log(`  Clip status:`);
    for (let i = 0; i < sceneCount; i++) {
      console.log(`    scene_${i}.mp4: ${klingClips[i] ? "✅" : "❌ missing"}`);
    }
  }
  console.log(`  Step 4 (Final video): ${mp3Exists && klingClips.filter(Boolean).length === sceneCount ? "✅ ready to compile" : "⏳ waiting"}`);

  return { scriptExists, mp3Exists, klingClips, sceneCount };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const config = getConfig();

  if (args.includes("--list")) {
    const slugs = getBlogSlugs();
    console.log("\n📚 Available blog posts:");
    slugs.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
    console.log("\nUsage: node run.js <slug>");
    return;
  }

  if (args.includes("--status")) {
    const slug = args[args.indexOf("--status") + 1];
    if (!slug) {
      console.error("Usage: node run.js --status <slug>");
      process.exit(1);
    }
    checkPipelineStatus(slug);
    return;
  }

  const slug = args[0];
  if (!slug) {
    console.error(`
FlarePix Video Pipeline

Usage:
  node run.js <slug>          Run pipeline for one blog post
  node run.js --list          List available blog slugs
  node run.js --status <slug> Show pipeline status

First-time setup:
  1. cp config.js config.local.js
  2. Fill in ANTHROPIC_API_KEY and ELEVENLABS_API_KEY in config.local.js
  3. node run.js <slug>
`);
    process.exit(1);
  }

  console.log(`\n🚀 FlarePix Video Pipeline — "${slug}"`);
  console.log("═".repeat(60));

  // Check config
  if (!config.anthropicApiKey) {
    console.error("❌ ANTHROPIC_API_KEY not set. Create config.local.js with your keys.");
    process.exit(1);
  }

  // ─── Step 1: Generate script ──────────────────────────────────────────────
  const scriptExists = fs.existsSync(path.join(PIPELINE_DIR, `${slug}.script.json`));

  if (scriptExists) {
    console.log("\n⚠️  Script already exists for this slug.");
    const overwrite = await ask("Regenerate script from blog post?");
    if (overwrite !== "y") {
      console.log("   Using existing script.");
    } else {
      const ok = runStep("step1-script.js", slug, "Step 1: Regenerating script");
      if (!ok) process.exit(1);
    }
  } else {
    const ok = runStep("step1-script.js", slug, "Step 1: Generating script");
    if (!ok) process.exit(1);
  }

  // Show script preview + Kling prompts
  const script = printScriptPreview(slug);
  if (script) printKlingPrompts(slug);

  // User confirmation
  if (!script) {
    console.error("❌ Script generation failed.");
    process.exit(1);
  }

  const confirmScript = await ask("\n✅ Script generated. Happy with this?");
  if (confirmScript !== "y") {
    console.log("\n✏️  Edit the script manually:");
    console.log(`   ${path.join(PIPELINE_DIR, `${slug}.script.json`)}`);
    console.log("Then re-run: node run.js", slug);
    process.exit(0);
  }

  // ─── Step 2: TTS ────────────────────────────────────────────────────────────
  const mp3Exists = fs.existsSync(path.join(PIPELINE_DIR, `${slug}.mp3`));
  if (mp3Exists) {
    console.log("\n⚠️  TTS MP3 already exists.");
    const overwrite = await ask("Regenerate TTS?");
    if (overwrite !== "y") {
      console.log("   Using existing MP3.");
    } else {
      const ok = runStep("step2-tts.js", slug, "Step 2: Regenerating TTS");
      if (!ok) process.exit(1);
    }
  } else {
    const ok = runStep("step2-tts.js", slug, "Step 2: Generating TTS");
    if (!ok) process.exit(1);
  }

  // ─── Step 3: User generates Kling clips ─────────────────────────────────────
  const sceneCount = script.scenes.length;
  console.log(`\n🎬 Step 3: Generate ${sceneCount} Kling video clip(s)`);
  console.log("═".repeat(60));
  console.log(`
⏰ IMPORTANT — Kling credits usage:
   Each scene = 1 Kling generation (~5-10 sec video)
   Total for this video: ${sceneCount} generation(s)
   Your existing Kling membership credits will be used.

📋 ACTION REQUIRED:
   1. Copy each prompt from: scripts/video-pipeline/kling-prompts/${slug}.kling-prompts.txt
   2. Go to: https://kling.klingai.com
   3. For each scene: paste the prompt, upload reference image from the blog post
   4. Download the generated video as scene_0.mp4, scene_1.mp4, ...
   5. Place all clips in: scripts/video-pipeline/kling-prompts/
   6. Then run: node run.js --continue ${slug}
`);

  // Check clips
  const missingClips = [];
  for (let i = 0; i < sceneCount; i++) {
    const clipPath = path.join(KLING_DIR, `scene_${i}.mp4`);
    if (!fs.existsSync(clipPath)) missingClips.push(i);
  }

  if (missingClips.length > 0) {
   console.log(`⚠️  Missing clips: ${missingClips.map((i) => `scene_${i}.mp4`).join(", ")}`);
    console.log("\nPlace your Kling-generated clips in the kling-prompts/ folder,");
    console.log("then run this command again: node run.js --continue", slug);
    return;
  }

  const continueFlag = args.includes("--continue");
  if (!continueFlag && missingClips.length > 0) {
    console.log("\nPipeline paused. Generate the clips and run again:");
    console.log(`  node run.js --continue ${slug}`);
    return;
  }

  // ─── Step 4: Compile ───────────────────────────────────────────────────────
  const output16x9 = path.join(OUTPUT_DIR, "16x9", `${slug}.mp4`);
  if (fs.existsSync(output16x9)) {
    const overwrite = await ask("\n⚠️  Final video already exists. Recompile?");
    if (overwrite !== "y") {
      console.log("✅ Pipeline complete. Output files:");
      console.log(`   ${output16x9}`);
      console.log(`   ${path.join(OUTPUT_DIR, "9x16", `${slug}.mp4`)}`);
      console.log(`   ${path.join(OUTPUT_DIR, "1x1", `${slug}.mp4`)}`);
      return;
    }
  }

  const ok = runStep("step4-compile.js", slug, "Step 4: Compiling videos");
  if (!ok) process.exit(1);

  console.log("\n🎉 Pipeline complete!");
  console.log("   Output files:");
  console.log(`   YouTube (16:9): ${path.join(OUTPUT_DIR, "16x9", `${slug}.mp4`)}`);
  console.log(`   TikTok (9:16):   ${path.join(OUTPUT_DIR, "9x16", `${slug}.mp4`)}`);
  console.log(`   LinkedIn (1:1): ${path.join(OUTPUT_DIR, "1x1", `${slug}.mp4`)}`);
  console.log("\n   Next: Upload to YouTube, set as unlisted first to test.");
}

main().catch((err) => {
  console.error("❌ Pipeline error:", err.message);
  process.exit(1);
});