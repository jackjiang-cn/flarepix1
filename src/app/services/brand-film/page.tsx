import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";

export const metadata: Metadata = {
  title: "Brand Film Production for Ecommerce — Hybrid Production with Real Footage + AI | FlarePix",
  description:
    "Cinematic brand films and commercial productions for Amazon and ecommerce brands. Hybrid approach: real footage blended with AI post-production — professional quality at a fraction of full production cost.",
  alternates: { canonical: "https://flarepix.com/services/brand-film" },
  openGraph: {
    title: "Brand Film Production for Ecommerce — Hybrid Production | FlarePix",
    description:
      "Cinematic brand films using a hybrid approach: real footage + AI post-production. Full creative direction for Amazon and ecommerce brands.",
    url: "https://flarepix.com/services/brand-film",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Brand Film Production for Ecommerce" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Film Production for Ecommerce | FlarePix",
    description:
      "Cinematic brand films using hybrid production: real footage + AI. Professional quality at lower cost.",
    images: ["/og-image.jpg"],
  },
};

const brandFilms = [
  { src: "/works/brand-film/brand-film-01.m4v", title: "Brand Film 01" },
  { src: "/works/brand-film/brand-film-02.m4v", title: "Brand Film 02" },
  { src: "/works/brand-film/brand-film-03.m4v", title: "Brand Film 03" },
  { src: "/works/brand-film/brand-film-04.m4v", title: "Brand Film 04" },
  { src: "/works/brand-film/brand-film-05.m4v", title: "Brand Film 05" },
  { src: "/works/brand-film/brand-film-06.m4v", title: "Brand Film 06" },
];

const brandFilmSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Brand Film Production — FlarePix",
  description:
    "Cinematic brand films and commercial productions for Amazon and ecommerce brands using a hybrid production approach: real footage combined with AI-assisted post-production.",
  thumbnailUrl: "https://flarepix.com/works/posters/brand-film.jpg",
  uploadDate: "2026-01-15",
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Commission a Brand Film for Your Product Launch",
  description:
    "Step-by-step guide to commissioning a brand film from FlarePix — from creative brief to final delivery.",
  step: [
    {
      "@type": "HowToStep",
      name: "Share your vision",
      text: "Tell us about your product, brand, target audience, and where the film will be used — product launch, trade show, paid social, or Amazon brand store.",
    },
    {
      "@type": "HowToStep",
      name: "We plan and budget",
      text: "Our team creates a creative concept and production plan — including whether real footage, AI generation, or a hybrid approach fits your goals best.",
    },
    {
      "@type": "HowToStep",
      name: "Production begins",
      text: "Real footage shot with professional equipment and talent, or AI-generated scenes — depending on the agreed scope. Creative direction provided throughout.",
    },
    {
      "@type": "HowToStep",
      name: "Post-production and review",
      text: "Footage goes through professional post-production — color grading, motion graphics, AI upscaling as needed. Every cut reviewed before approval.",
    },
    {
      "@type": "HowToStep",
      name: "Final delivery",
      text: "Final film delivered in all required formats — optimized for Amazon Brand Store, YouTube, Instagram, or wherever your audience watches.",
    },
  ],
};

export default function BrandFilmPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([brandFilmSchema, howToSchema]) }}
      />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services#brand-film"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <p className="mt-6 text-sm font-medium text-[var(--amber)]">
          Premium tier
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Brand Film Production
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Cinematic brand films and commercial productions for your biggest
          launches. We use a hybrid approach — real footage combined with
          AI-assisted post-production — delivering the visual impact of a full
          studio shoot at a more accessible price point.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Get a quote</CtaButton>
        </div>

        {/* Video showcase */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Showcase</h2>
          <GalleryLightbox
            items={brandFilms.map((film) => ({ src: film.src, type: "video" as const, title: film.title }))}
            columns={2}
          />
        </section>

        {/* Stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">4K</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Production quality</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">2-4</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Weeks delivery</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">100%</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Brand ownership</p>
          </div>
        </div>

        {/* SEO content */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Why the hybrid approach delivers better brand films</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[var(--muted)]">
                A full-production shoot — professional talent, multi-day studio rental, full crew — delivers cinematic results. But the cost and lead time are prohibitive for most Amazon sellers launching multiple products per quarter.
              </p>
              <p className="mt-4 text-[var(--muted)]">
                AI-only tools solve for cost and speed — but the output often looks generic, with that characteristic &ldquo;AI feel&rdquo; that savvy consumers immediately recognise. When your brand film looks like everyone else&apos;s AI output, it undermines the brand credibility you&apos;re trying to build.
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Our hybrid approach combines real footage (professional talent, real studio or location) with AI-assisted post-production (colour grading, motion graphics, upscaling). The result: cinematic quality at a fraction of traditional cost, with turnaround that fits your product launch calendar. Based in Qingdao — the world&apos;s manufacturing hub — we work with sellers worldwide who source from Chinese manufacturers. Your products are already here. Your visuals should match your brand.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">What you get with every brand film</p>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Creative concept and script</strong> — Narrative direction developed from your brand brief before a single frame is shot</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Professional shoot</strong> — Studio or location with professional lighting, talent, and creative direction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>AI-assisted post-production</strong> — Color grading, motion graphics, sound design, music licensing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Multiple deliverables</strong> — 30s, 60s, 90s cuts plus social crop variants, all in your required formats</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services/ai-video"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Need something faster?</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Video →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Generate product videos at scale without a full production.
            </p>
          </Link>
          <Link
            href="/services/ai-imagery"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Pair with</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Imagery →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Lifestyle images and on-model shots to extend your campaign.
            </p>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
