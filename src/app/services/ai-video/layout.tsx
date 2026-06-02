import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Video — AI-Generated Product Videos for Social & Ads | FlarePix",
  description:
    "AI-generated short videos from a single product image. Brings static products to life for social media, paid ads, and product detail pages. Scalable and on-brand.",
  alternates: { canonical: "https://flarepix.com/services/ai-video" },
  openGraph: {
    title: "AI Video — FlarePix",
    description:
      "AI-generated short product videos from a single image. Social, ads, and PDP ready.",
    url: "https://flarepix.com/services/ai-video",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Video",
  description:
    "AI-generated short product videos from a single product image. Ideal for social media, paid ads, and product detail pages.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
  areaServed: "Worldwide",
  serviceType: "AI product video generation",
};

export default function AiVideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
