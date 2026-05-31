"use client";

import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";

const aiVideos = [
  { src: "/works/ai/videos/ai-video-01.mp4", title: "AI product animation" },
  { src: "/works/ai/videos/ai-video-02.mp4", title: "AI scene generation" },
  { src: "/works/ai/videos/ai-video-03.mp4", title: "AI social video" },
  { src: "/works/ai/videos/ai-video-04.mp4", title: "AI product video" },
];

export default function AiVideoPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services#ai-video"
          className="text-sm text-[var(--muted)] hover:text-white transition-colors"
        >
          &larr; All services
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          AI Video
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          AI-generated short videos from product images. Fast, scalable, and
          ready for social media, Amazon listings, and ecommerce product pages.
          No shoot required — generate videos remotely.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Get a quote</CtaButton>
        </div>

        {/* Video gallery */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">AI video examples</h2>
          <GalleryLightbox
            items={aiVideos.map((v) => ({ src: v.src, type: "video" as const, title: v.title }))}
            columns={2}
          />
        </section>

        <div className="mt-16 rounded-2xl border border-dashed border-white/[0.08] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">
            More AI video examples coming soon.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}