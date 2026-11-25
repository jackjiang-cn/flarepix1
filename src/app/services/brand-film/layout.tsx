import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Film — Cinematic Brand Video Production | FlarePix",
  description:
    "Cinematic brand films and commercial productions for hero product launches. Full creative direction, professional lighting, and post-production included.",
  alternates: { canonical: "https://www.flarepix.com/services/brand-film" },
  openGraph: {
    title: "Brand Film — FlarePix",
    description:
      "Cinematic brand films and commercial productions for your biggest launches.",
    url: "https://www.flarepix.com/services/brand-film",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Commercial & Brand Film Production",
  description:
    "Commercials, launch films, and brand stories for consumer brands and ecommerce teams, from concept and filming to editing and delivery.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://www.flarepix.com",
  },
  areaServed: "Worldwide",
  serviceType: "Commercial video and brand film production",
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
