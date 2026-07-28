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

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flarepix.com"),
  title: "Product Photography Studio for Amazon — FlarePix",
  description:
    "Professional product photography, video, AI-generated imagery, and AI video for Amazon and ecommerce brands. Ship your products or generate visuals remotely.",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "https://www.flarepix.com",
  },
  openGraph: {
    title: "Product Photography Studio for Amazon — FlarePix",
    description:
      "Photo, video, AI imagery, and AI video — one studio for all your ecommerce visuals.",
    siteName: "FlarePix",
    url: "https://www.flarepix.com",
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
  url: "https://www.flarepix.com",
  logo: "https://www.flarepix.com/favicon.svg",
  email: contact.email,
  telephone: contact.phone,
  description:
    "AI-powered product photography and video services for ecommerce brands",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Qingdao",
    addressRegion: "Shandong",
    addressCountry: "CN",
  },
  sameAs: Object.values(contact.social),
  contactPoint: {
    "@type": "ContactPoint",
    email: contact.email,
    contactType: "customer service",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

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
      <head>
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
