"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";

const aiImages = [
  { src: "/works/ai/images/ai-image-01.webp", alt: "AI product image" },
  { src: "/works/ai/images/ai-image-02.webp", alt: "AI on-model fashion" },
  { src: "/works/ai/images/ai-image-03.webp", alt: "AI lifestyle scene" },
  { src: "/works/ai/images/ai-image-04.webp", alt: "AI campaign visual" },
  { src: "/works/ai/images/ai-image-05.webp", alt: "AI product in scene" },
  { src: "/works/ai/images/ai-image-06.webp", alt: "AI virtual try-on" },
];

export default function AiImageryPage() {
  return (
    <>
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

        <div className="mt-16 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">
            More AI imagery examples coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}