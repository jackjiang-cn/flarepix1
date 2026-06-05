import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.flarepix.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // HTTP → HTTPS (Vercel provides this automatically for custom domains,
      // but adding it here ensures it works when accessed directly before Cloudflare)
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://flarepix.com/:path*",
        permanent: true,
      },
      // NOTE: www → non-www redirect is handled by Cloudflare, NOT here.
      // Having it in both places causes ERR_TOO_MANY_REDIRECTS.
    ];
  },
};

export default nextConfig;
