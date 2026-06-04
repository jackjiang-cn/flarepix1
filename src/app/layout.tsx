import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { contact } from "@/config/contact";

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
  title: "FlarePix — AI-Powered Product Photography & Video for Ecommerce",
  description:
    "Professional product photography, video, AI-generated imagery, and AI video for Amazon and ecommerce brands. Ship your products or generate visuals remotely.",
  icons: { icon: "/favicon.svg" },
  alternates: {
    canonical: "https://flarepix.com",
  },
  openGraph: {
    title: "FlarePix — AI-Powered Product Photography & Video",
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
        alt: "FlarePix — AI-Powered Product Photography & Video",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlarePix — AI-Powered Product Photography & Video",
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
  email: "hello@flarepix.com",
  description:
    "AI-powered product photography and video services for ecommerce brands",
  sameAs: [
    "https://youtube.com/@flarepix",
    "https://instagram.com/flarepix",
    "https://x.com/flarepix",
    "https://linkedin.com/company/flarepix",
    "https://tiktok.com/@flarepix",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@flarepix.com",
    contactType: "customer service",
  },
};

// ProfessionalService schema — serves global ecommerce brands from Qingdao, China
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://flarepix.com/#business",
  name: "FlarePix",
  url: "https://flarepix.com",
  logo: "https://flarepix.com/favicon.svg",
  email: "hello@flarepix.com",
  description:
    "AI-powered product photography and video services for Amazon and ecommerce brands. Based in Qingdao, China — serving sellers worldwide.",
  // address populated from contact.ts
  ...(contact.address
    ? {
        address: {
          "@type": "PostalAddress" as const,
          addressLocality: "Qingdao",
          addressRegion: "Shandong",
          addressCountry: "CN" as const,
        },
      }
    : {}),
  ...(contact.phone ? { telephone: contact.phone } : {}),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  priceRange: "$$",
  areaServed: "Worldwide",
  serviceType: [
    "Product Photography",
    "Video Production",
    "AI Imagery",
    "AI Video",
  ],
  sameAs: [
    "https://youtube.com/@flarepix",
    "https://instagram.com/flarepix",
    "https://x.com/flarepix",
    "https://linkedin.com/company/flarepix",
    "https://tiktok.com/@flarepix",
  ],
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
            __html: JSON.stringify([organizationJsonLd, localBusinessJsonLd]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
