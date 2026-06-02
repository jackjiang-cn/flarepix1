import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FlarePix — Product Photography, Video & AI Visuals for Ecommerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1b3b2f 0%, #2d5a47 100%)",
          color: "#f4f2ec",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#b8975c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#1b3b2f",
            }}
          >
            F
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            FlarePix
          </div>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 32,
            maxWidth: 1000,
          }}
        >
          Product photography, video & AI visuals
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#e8e5dc",
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          Photo, video, AI imagery, and AI video — one studio for ecommerce brands
        </div>
      </div>
    ),
    { ...size }
  );
}
