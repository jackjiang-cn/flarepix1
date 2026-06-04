"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";

const brandFilms = [
  { src: "/works/brand-film/brand-film-01.m4v", title: "Brand Film 01" },
  { src: "/works/brand-film/brand-film-02.m4v", title: "Brand Film 02" },
  { src: "/works/brand-film/brand-film-03.m4v", title: "Brand Film 03" },
  { src: "/works/brand-film/brand-film-04.m4v", title: "Brand Film 04" },
  { src: "/works/brand-film/brand-film-05.m4v", title: "Brand Film 05" },
  { src: "/works/brand-film/brand-film-06.m4v", title: "Brand Film 06" },
];

export default function BrandFilmPage() {
  return (
    <>
      <Header />
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
          launches. Full creative direction, professional lighting, and
          post-production included — everything you need for your hero products.
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
        <section className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">What is a brand film?</h2>
            <p className="mt-3 text-[var(--muted)]">
              A brand film is a cinematic video that tells your brand story — not a product demo, but an emotional narrative that connects your product to your audience. It is the content you use for your biggest product launches, homepage hero, trade shows, investor decks, and paid social campaigns.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Unlike AI-generated content or quick turnaround video, a brand film involves creative direction, script development, professional talent, controlled studio or location shoots, and multi-week post-production. The result is a premium asset that reflects the quality of your brand and can be used across every channel for years.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Based in Qingdao, China — the world's manufacturing hub — we produce brand films for sellers worldwide who source their products from China and want visuals that match the quality of their brand.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What you get</h2>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Creative concept and script</strong> — We develop the narrative direction based on your brand brief</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Professional shoot</strong> — Studio or location with professional lighting, talent, and direction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Multi-week post-production</strong> — Color grading, motion graphics, sound design, music licensing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Multiple deliverables</strong> — 30s, 60s, 90s cuts plus social crop variants</span>
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
