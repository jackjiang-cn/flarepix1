import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI Video, Directed for Your Brand — FlarePix";
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
            fontSize: 24,
            color: "#b8975c",
            textTransform: "uppercase",
            letterSpacing: 4,
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          FlarePix / AI Video Production
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            marginBottom: 32,
          }}
        >
          <span>AI Video, Directed</span>
          <span>{"for Your\u00a0Brand."}</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#e8e5dc",
            lineHeight: 1.3,
            maxWidth: 900,
          }}
        >
          AI-assisted scenes and ad variations, planned and reviewed by our team.
        </div>
      </div>
    ),
    { ...size }
  );
}
