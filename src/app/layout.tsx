import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { contact } from "@/config/contact";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flarepix.com"),
  title: "Product Photography Studio for Amazon — FlarePix",
  description:
    "Professional product photography, video, AI-generated imagery, and AI video for Amazon and ecommerce brands. Ship your products or generate visuals remotely.",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "https://flarepix.com",
  },
  openGraph: {
    title: "Product Photography Studio for Amazon — FlarePix",
    description:
      "Photo, video, AI imagery, and AI video — one studio for all your ecommerce visuals.",
    siteName: "FlarePix",
    url: "https://flarepix.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Product Photography Studio for Amazon — FlarePix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Photography Studio for Amazon — FlarePix",
    description:
      "Photo, video, AI imagery, and AI video — one studio for all your ecommerce visuals.",
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlarePix",
  url: "https://flarepix.com",
  logo: "https://flarepix.com/favicon.svg",
  email: contact.email,
  description:
    "AI-powered product photography and video services for ecommerce brands",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Qingdao",
    addressRegion: "Shandong",
    addressCountry: "CN",
  },
  sameAs: [
    `https://youtube.com/@flarepix`,
    `https://instagram.com/flarepix`,
    `https://x.com/flarepix`,
    `https://linkedin.com/company/flarepix`,
    `https://tiktok.com/@flarepix`,
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: contact.email,
    contactType: "customer service",
  },
};

// VideoObject schema — describes the hero brand film
const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "FlarePix Hero Reel",
  description:
    "Product photography, video and AI imagery showreel for ecommerce and Amazon brands",
  thumbnailUrl: "https://flarepix.com/works/posters/hero-reel.jpg",
  contentUrl: "https://media.flarepix.com/works/hero-reel.mp4",
  uploadDate: "2026-01-15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, videoJsonLd]),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
