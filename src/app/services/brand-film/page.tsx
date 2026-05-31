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
          className="text-sm text-[var(--muted)] hover:text-white transition-colors"
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
          <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">4K</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Production quality</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">2-4</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Weeks delivery</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">100%</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Brand ownership</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}