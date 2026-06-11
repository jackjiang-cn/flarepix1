/**
 * Step 2: Video script → ElevenLabs TTS MP3
 *
 * Reads a script JSON from step1-script.js, concatenates all narration text,
 * generates English TTS audio via ElevenLabs API, and saves as MP3.
 *
 * Usage: node step2-tts.js <slug>
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY || "";
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsdWDwmVDXI8z8"; // Default: Rachel (warm female)
const OUTPUT_DIR = __dirname;
// ─────────────────────────────────────────────────────────────────────────

/**
 * Call ElevenLabs TTS API, return audio buffer.
 */
async function generateTTS(text, voiceId = VOICE_ID) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.2,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${voiceId}?optimize_for_streaming=true`,
      method: "POST",
      headers: {
        "xi-api-key": ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
        accept: "audio/mpeg",
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const err = JSON.parse(data);
            reject(new Error(err.message || `ElevenLabs error ${res.statusCode}`));
          } catch {
            reject(new Error(`ElevenLabs error ${res.statusCode}: ${data}`));
          }
        });
        return;
      }

      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/**
 * Concatenate all narration from scenes into one script text.
 * Add natural pauses between scenes (represented by [... pause]).
 */
function buildNarrationText(scenes) {
  return scenes
    .map((scene, i) => {
      const text = scene.narration || "";
      if (!text) return "";
      // Add a short pause between scenes
      const pause = i > 0 ? "\n\n[Pause]\n\n" : "";
      return pause + text;
    })
    .filter(Boolean)
    .join("");
}

/**
 * Estimate TTS duration in seconds from word count.
 * ElevenLabs multilingual v2 ~150 words/min at normal speed.
 */
function estimateDuration(wordCount) {
  return Math.round((wordCount / 150) * 60);
}

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node step2-tts.js <slug>");
    process.exit(1);
  }

  if (!ELEVENLABS_API_KEY) {
    console.error("Error: ELEVENLABS_API_KEY environment variable is not set.");
    process.exit(1);
  }

  // Load script JSON
  const scriptPath = path.join(OUTPUT_DIR, `${slug}.script.json`);
  if (!fs.existsSync(scriptPath)) {
    console.error(`❌ Script file not found: ${scriptPath}`);
    console.error("Run step1-script.js first.");
    process.exit(1);
  }

  const script = JSON.parse(fs.readFileSync(scriptPath, "utf8"));
  const scenes = script.scenes;

  console.log(`\n🎙 Step 2: Generating TTS for "${slug}"...\n`);
  console.log(`   Title: ${script.title}`);
  console.log(`   Scenes: ${scenes.length}`);

  // Build narration text
  const narrationText = buildNarrationText(scenes);
  const wordCount = narrationText.split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = estimateDuration(wordCount);

  console.log(` Narration words: ${wordCount}`);
  console.log(`   Estimated audio duration: ~${Math.round(estimatedSeconds / 60)}min ${estimatedSeconds % 60}s`);
  console.log(`   Voice: ${VOICE_ID}`);
  console.log("\nCalling ElevenLabs API (this may take 30-60 seconds)...\n");

  // Generate TTS
  const audioBuffer = await generateTTS(narrationText);

  // Save MP3
  const mp3Path = path.join(OUTPUT_DIR, `${slug}.mp3`);
  fs.writeFileSync(mp3Path, audioBuffer);
  const sizeKB = Math.round(audioBuffer.length / 1024);

  console.log(`✅ TTS generated successfully!`);
  console.log(`   File: ${mp3Path}`);
  console.log(`   Size: ${sizeKB} KB`);

  return { slug, mp3Path, wordCount, estimatedSeconds };
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});