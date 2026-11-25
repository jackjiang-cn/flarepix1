import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Assisted Campaign Imagery | FlarePix",
  description:
    "Explore AI-assisted campaign imagery created from approved product references, with each project's scope and suitability reviewed against the brief.",
  alternates: { canonical: "https://www.flarepix.com/services/ai-imagery" },
  openGraph: {
    title: "AI-Assisted Campaign Imagery | FlarePix",
    description:
      "Explore AI-assisted campaign imagery created from approved product references, with each project's scope and suitability reviewed against the brief.",
    url: "https://www.flarepix.com/services/ai-imagery",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI-Assisted Campaign Imagery",
  description:
    "AI-assisted campaign imagery created from approved product references, with scope and suitability reviewed against each project brief.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://www.flarepix.com",
  },
  areaServed: "Worldwide",
  serviceType: "AI-assisted campaign imagery",
  image: "https://media.flarepix.com/works/ai/images/ai-image-01.webp",
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
