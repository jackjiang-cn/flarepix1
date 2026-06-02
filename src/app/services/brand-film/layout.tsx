import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Film — Cinematic Brand Video Production | FlarePix",
  description:
    "Cinematic brand films and commercial productions for hero product launches. Full creative direction, professional lighting, and post-production included.",
  alternates: { canonical: "https://flarepix.com/services/brand-film" },
  openGraph: {
    title: "Brand Film — FlarePix",
    description:
      "Cinematic brand films and commercial productions for your biggest launches.",
    url: "https://flarepix.com/services/brand-film",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Film Production",
  description:
    "Cinematic brand films and commercial productions for hero product launches. Full creative direction, professional lighting, and post-production included.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
  areaServed: "Worldwide",
  serviceType: "Brand film production",
};

export default function BrandFilmLayout({
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
