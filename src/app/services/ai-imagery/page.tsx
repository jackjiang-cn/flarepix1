import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";
import ServiceFaq from "@/components/service-faq";

export const metadata: Metadata = {
  title: "AI Product Imagery for Ecommerce — Lifestyle Scenes & On-Model Shots | FlarePix",
  description:
    "Generate lifestyle scenes, on-model shots, and campaign visuals from a single product photo. AI imagery for Amazon and ecommerce — fast turnaround, no shipping required.",
  alternates: { canonical: "https://flarepix.com/services/ai-imagery" },
  openGraph: {
    title: "AI Product Imagery for Amazon — Lifestyle Scenes & On-Model Photos | FlarePix",
    description:
      "Generate lifestyle scenes, on-model shots, and campaign visuals from a single product photo. AI imagery for Amazon and ecommerce.",
    url: "https://flarepix.com/services/ai-imagery",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AI Product Imagery for Amazon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Product Imagery for Amazon | FlarePix",
    description:
      "Generate lifestyle scenes and on-model shots from a single product photo. AI imagery for ecommerce brands.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Product Imagery — FlarePix",
  description:
    "AI-generated lifestyle scenes, on-model shots, and campaign visuals from a single product photo. For Amazon and ecommerce brands.",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
  areaServed: "Worldwide",
  thumbnailUrl: "https://media.flarepix.com/works/ai/images/ai-image-01.webp",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://flarepix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://flarepix.com/services" },
    { "@type": "ListItem", position: 3, name: "AI Imagery", item: "https://flarepix.com/services/ai-imagery" },
  ],
};

const aiImageryFaqs = [
  {
    q: "What does the AI imagery process look like?",
    a: "Send us your product photo — a clean white background shot or flat lay works best. Tell us the target use case (Amazon lifestyle images, social campaign, email visual) and any style references. We generate the images, run them through human quality review, and deliver finished files ready for upload.",
  },
  {
    q: "Will the AI images look realistic?",
    a: "Without professional review, AI-generated images often show artifacts: unnatural fabric draping, incorrect product proportions, or generic-looking scenes that hurt brand credibility. FlarePix reviews every output before delivery — checking product accuracy, visual quality, and brand consistency. You receive finished images, not a draft to experiment with.",
  },
  {
    q: "What file formats do you deliver?",
    a: "We deliver JPG and WebP files in high resolution, optimised for Amazon upload, web, email, and print. No conversion needed — files are ready to upload directly.",
  },
  {
    q: "Do I need to ship my products to you?",
    a: "No — for AI imagery, you only need to send a reference photo of your product. No shipping, no studio appointment, no logistics. We work with sellers worldwide who source from Chinese manufacturers or Dropship directly.",
  },
  {
    q: "Can AI imagery replace traditional product photography?",
    a: "For lifestyle contexts, social content, and seasonal refreshes, yes — AI imagery is a fast, scalable alternative to traditional studio shoots. For exact product representation (white background Amazon images, precise color matching), traditional photography may still be preferred. Many brands use both: traditional shots for the main listing images, AI imagery for lifestyle and campaign content.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema, faqSchema]) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services#ai-imagery"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          AI Imagery
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          AI-generated lifestyle scenes, on-model imagery, and campaign visuals
          — built from real product photos for accuracy. Fast turnaround, no
          physical shipping required.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Get a quote</CtaButton>
        </div>

        {/* Gallery */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">AI-generated examples</h2>
          <GalleryLightbox
            items={aiImages.map((img) => ({ src: img.src, type: "image" as const, alt: img.alt }))}
            columns={3}
          />
        </section>

        {/* SEO content — explains the service in depth */}
        <section className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">What is AI product imagery?</h2>
            <p className="mt-3 text-[var(--muted)]">
              AI product imagery uses artificial intelligence to generate lifestyle scenes, on-model shots, and campaign visuals from a single reference photo of your product. Unlike traditional photography, it requires no studio time, no models, and no shipping — just upload your product image and let AI do the rest.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              The result is photorealistic imagery that places your product in aspirational contexts — a living room, a beach, a city street — while maintaining accurate product geometry and color. Every image is brand-safe and on-model, without the logistics of a traditional shoot.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Based in Qingdao, China — the world's manufacturing hub — we work with Amazon and ecommerce sellers globally. Your products are already here. Your visuals should be too.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Use cases for AI imagery</h2>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Amazon listings</strong> — Lifestyle images that convert better than white background shots alone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Social media campaigns</strong> — On-model content at scale without booking models</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Email and display ads</strong> — Campaign visuals generated in hours, not weeks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Seasonal refreshes</strong> — Update imagery for holidays and trends without reshoots</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-16 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">
            More AI imagery examples coming soon.
          </p>
        </div>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services/ai-video"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Explore also</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Video →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Turn product images into short videos for social and ads.
            </p>
          </Link>
          <Link
            href="/services/brand-film"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Looking for something bigger?</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              Brand Film Production →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Cinematic brand films for hero product launches.
            </p>
          </Link>
        </section>

        <ServiceFaq faqs={aiImageryFaqs} />
      </main>
      <Footer />
    </>
  );
}
