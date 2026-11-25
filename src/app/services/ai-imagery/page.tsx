import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";
import ServiceFaq from "@/components/service-faq";

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
  twitter: {
    card: "summary_large_image",
    title: "AI-Assisted Campaign Imagery | FlarePix",
    description:
      "Explore AI-assisted campaign imagery created from approved product references, with each project's scope and suitability reviewed against the brief.",
    images: ["/og-image.jpg"],
  },
};

const aiImages = [
  { src: "/works/ai/images/ai-image-01.webp", alt: "AI product image" },
  { src: "/works/ai/images/ai-image-02.webp", alt: "AI on-model fashion" },
  { src: "/works/ai/images/ai-image-03.webp", alt: "AI lifestyle scene" },
  { src: "/works/ai/images/ai-image-04.webp", alt: "AI campaign visual" },
  { src: "/works/ai/images/ai-image-05.webp", alt: "AI product in scene" },
  { src: "/works/ai/images/ai-image-06.webp", alt: "AI virtual try-on" },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flarepix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.flarepix.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Imagery", item: "https://www.flarepix.com/services/ai-imagery" },
  ],
};

const aiImageryFaqs = [
  {
    q: "What reference materials do you need?",
    a: "Share approved product photos, specifications, packaging or label details, brand references, and the channels where the images will be used. We confirm what else is needed after reviewing the brief.",
  },
  {
    q: "Is one product photo enough?",
    a: "A single photo may be enough to explore a simple concept. Products with important details often need images from more angles or additional specifications. We assess feasibility from the references you provide.",
  },
  {
    q: "How do you check product accuracy?",
    a: "We compare generated results with the approved product references, including visible shape, color, labels, and materials. If a detail must be represented exactly, we may recommend photography.",
  },
  {
    q: "Do I need to ship a product sample?",
    a: "Reference-led imagery may not require shipping. If the supplied assets do not show details needed for an accurate result, we may request a sample or recommend a studio photograph.",
  },
  {
    q: "How are formats and timing decided?",
    a: "We agree on image dimensions, file types, variations, review points, and timing in the project proposal before production begins.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aiImageryFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiImageryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, faqSchema]) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          AI-Assisted Campaign Imagery
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          For briefs that benefit from generated settings or visual variations,
          we work from approved product references and review the results for
          product accuracy and brand fit. When exact details matter, we may
          recommend photography.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Discuss a Project</CtaButton>
        </div>

        {/* Gallery */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">AI-generated examples</h2>
          <GalleryLightbox
            items={aiImages.map((img) => ({ src: img.src, type: "image" as const, alt: img.alt }))}
            columns={3}
          />
        </section>

        <section className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">When AI-assisted imagery fits</h2>
            <p className="mt-3 text-[var(--muted)]">
              AI-assisted imagery can help explore campaign settings, seasonal variations, and visual concepts from approved product references. It works best when the surrounding scene can change while the product remains clearly represented.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              We review results against the supplied references. Generated images can misrepresent labels, materials, color, or shape; when exact representation matters, we may recommend a photograph.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Possible uses</h2>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Campaign concepts</strong> — Explore settings and visual directions for an agreed brief</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Seasonal variations</strong> — Adapt backgrounds and context when the product can be represented accurately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Social and display assets</strong> — Create image variations for the placements agreed in the project</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services/ai-video"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Explore motion content</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Video →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              AI-assisted scenes and ad variations created from approved product references.
            </p>
          </Link>
          <Link
            href="/services#product-photography"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Need exact product detail?</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              Product Photography →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Studio and lifestyle photographs for ecommerce and campaigns.
            </p>
          </Link>
        </section>

        <ServiceFaq faqs={aiImageryFaqs} />
      </main>
      <Footer />
    </>
  );
}
