// Generate 800x800 FlarePix logo on white background.
// Run: node scripts/make-logo.js

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const W = 800;
const H = 800;
const FOREGROUND = "#1b3b2f"; // brand dark green (matches --foreground)
const AMBER = "#C9A96E";       // brand amber
const FONT = "Arial";          // closest to Inter on Windows

// 1) Render logo with text-anchor=middle to get true horizontal center.
// 2) Use dominant-baseline=central to get true vertical center.
// 3) Two text spans with same x/y so they sit on the same baseline.
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <text
    x="${W / 2}"
    y="${H / 2}"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="${FONT}, 'Helvetica Neue', Helvetica, sans-serif"
    font-weight="700"
    font-size="180"
    letter-spacing="-4"
  >
    <tspan fill="${FOREGROUND}">Flare</tspan><tspan fill="${AMBER}">Pix</tspan>
  </text>
</svg>
`;

const outPath = path.join(__dirname, "..", "flarepix-logo-800.png");

sharp(Buffer.from(svg))
  .png()
  .toFile(outPath)
  .then(info => {
    console.log("Wrote", outPath);
    console.log("Size:", fs.statSync(outPath).size, "bytes");
    console.log("Dimensions:", info.width, "x", info.height);
  })
  .catch(err => {
    console.error("Failed:", err);
    process.exit(1);
  });
