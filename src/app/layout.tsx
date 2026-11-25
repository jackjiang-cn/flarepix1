import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { contact } from "@/config/contact";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsConsent from "@/components/analytics-consent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flarepix.com"),
  title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
  description:
    "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "https://www.flarepix.com",
  },
  openGraph: {
    title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
    description:
      "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
    siteName: "FlarePix",
    url: "https://www.flarepix.com",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Video & Visual Content for Consumer Brands | FlarePix",
    description:
      "FlarePix creates commercial videos, product demonstrations, advertising creatives, and photography for consumer brands and ecommerce teams.",
    images: ["/og-image.jpg"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FlarePix",
  url: "https://www.flarepix.com",
  logo: "https://www.flarepix.com/favicon.svg",
  email: contact.email,
  telephone: contact.phone,
  description:
    "Commercial video and visual content production for consumer brands and ecommerce teams",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Qingdao",
    addressRegion: "Shandong",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: contact.email,
    contactType: "customer service",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const adsId = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID?.trim() ?? "";

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
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
        <AnalyticsConsent gaId={gaId} adsId={adsId} />
      </body>
    </html>
  );
}
