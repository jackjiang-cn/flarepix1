import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/media/quick-n-body/v1/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/media/quick-n-body/v1/:segment(segment-[^/]+\\.m4s)",
        headers: [{ key: "Content-Type", value: "video/iso.segment" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/services/video-others",
        destination: "/work?videocategory=video-others#category-archive",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.flarepix.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
