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
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
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

        {/* SEO content */}
        <section className="mt-16 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">What is AI product video?</h2>
            <p className="mt-3 text-[var(--muted)]">
              AI product video generation takes a single product image and creates short video clips — animated product spins, lifestyle motion, social content — without a physical shoot. You get moving content that performs better than static images on Amazon, Instagram, TikTok, and paid ad platforms.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Unlike traditional video production that requires equipment, talent, and post-production, AI video generation delivers in days. It scales to hundreds of SKUs without linear cost increases — ideal for brands with large catalogs or frequent seasonal updates.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Working with sellers in the US, UK, and Europe — all with products manufactured in China. We handle the visuals so you can focus on growing your business.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Where AI video drives results</h2>
            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Amazon A+ Content</strong> — Video thumbnails on product detail pages increase conversion rates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Social media ads</strong> — Generate hundreds of video variants for Meta and TikTok campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Email marketing</strong> — Video in email boosts click-through rates significantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                <span><strong>Retargeting ads</strong> — Scale creative production without depleting your media budget</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-16 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">
            More AI video examples coming soon.
          </p>
        </div>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services/ai-imagery"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Pair with</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Imagery →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Generate lifestyle images to go with your video content.
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
      </main>
      <Footer />
    </>
  );
}
