import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Imagery — AI-Generated Lifestyle Photos for Ecommerce | FlarePix",
  description:
    "AI-generated lifestyle scenes, on-model imagery, and campaign visuals built from real product photos. Fast turnaround, no shipping required, accurate product geometry.",
  alternates: { canonical: "https://www.flarepix.com/services/ai-imagery" },
  openGraph: {
    title: "AI Imagery — FlarePix",
    description:
      "AI-generated lifestyle scenes, on-model imagery, and campaign visuals from real product photos.",
    url: "https://www.flarepix.com/services/ai-imagery",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Imagery",
  description:
    "AI-generated lifestyle scenes, on-model imagery, and campaign visuals built from real product photos. No shipping required.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://www.flarepix.com",
  },
  areaServed: "Worldwide",
  serviceType: "AI product imagery generation",
};

export default function AiImageryLayout({
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
