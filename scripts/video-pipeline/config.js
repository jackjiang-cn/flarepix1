/**
 * Video Pipeline Configuration
 *
 * Copy this file to config.local.js and fill in your API keys.
 * config.local.js is ignored by git (in .gitignore).
 *
 * Required environment variables (alternatively set directly here):
 *   ANTHROPIC_API_KEY   — Claude API key for script generation
 *   ELEVENLABS_API_KEY  — ElevenLabs API key for TTS
 *   ELEVENLABS_VOICE_ID — ElevenLabs voice ID (optional, has a default)
 */

module.exports = {
  // Anthropic Claude API key (get from console.anthropic.com)
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",

  // ElevenLabs API key (get from elevenlabs.io)
  elevenlabsApiKey: process.env.ELEVENLABS_API_KEY || "",

  // ElevenLabs voice ID (get from elevenlabs.io/voices)
  // Default: Rachel (warm female English voice)
  elevenlabsVoiceId: process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsdWDwmVDXI8z8",

  // Pipeline settings
  pipeline: {
    // Pause after Step 1 to let user confirm the script
    pauseAfterScript: true,

    // Ask before running TTS (if step1 was already done)
    confirmTTS: true,

    // Ask before running compile
    confirmCompile: true,
  },
};