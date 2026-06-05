import Image from "next/image";
import { cdnUrl, posterFor } from "@/config/cdn";

type ImageItem = {
  kind: "image";
  src: string;
  alt: string;
  title: string;
  body: string;
  align: "left" | "right";
};

type VideoItem = {
  kind: "video";
  src: string;
  title: string;
  body: string;
  align: "left" | "right";
};

const items: (ImageItem | VideoItem)[] = [
  {
    kind: "image",
    src: "/works/photo/accessories/accessories_1.jpg",
    alt: "Studio product photography — accessories",
    title: "Product Photography",
    body: "Studio product photography for ecommerce and Amazon brands, enhanced by AI-powered retouching and color matching. We shoot fashion, footwear, beauty, accessories, home goods, and consumer products with consistent lighting, accurate color, and platform-ready deliverables.",
    align: "left",
  },
  {
    kind: "video",
    src: "/works/video/Electronics/product-video-09.m4v",
    title: "Product Video",
    body: "Studio-grade product videos for Amazon listings, social ads, and brand sites — with AI-assisted editing for faster turnaround. From clean white-background product shots to lifestyle scenes, every video is delivered in vertical, square, and landscape ratios ready for Amazon, Shopify, Instagram, and TikTok.",
    align: "right",
  },
  {
    kind: "image",
    src: "/works/ai/images/ai-image-02.webp",
    alt: "AI-generated lifestyle product imagery",
    title: "AI Imagery",
    body: "AI-generated lifestyle and on-model imagery built from your real product photos. Our AI pipeline places your products in any scene — from beach sunsets to urban studios — with no physical shipping, fast turnaround, and unlimited creative iterations. Ideal for hero images, lifestyle sets, and A/B testing.",
    align: "left",
  },
  {
    kind: "video",
    src: "/works/ai/videos/ai-video-02.mp4",
    title: "AI Video",
    body: "AI-generated short videos from a single product image. Our AI motion models bring static products to life for social media, paid ads, and product detail pages — scalable, fast, and on-brand without the cost of a full production shoot.",
    align: "right",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          What we do
        </h2>
        <p className="mt-4 text-lg text-[var(--muted)]">
          Studio visuals and AI-generated content for ecommerce brands — one
          workflow, every format your customers see.
        </p>
      </div>

      <div className="mt-20 space-y-20">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
          >
            <div
              className={`relative overflow-hidden rounded-2xl bg-[var(--surface)] ${
                item.kind === "video" ? "aspect-video" : "aspect-[4/3]"
              } ${item.align === "right" ? "lg:order-2" : "lg:order-1"}`}
            >
              {item.kind === "image" ? (
                <Image
                  src={cdnUrl(item.src)}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="relative h-full w-full">
                  {/* Poster thumbnail (first frame of video) */}
                  <Image
                    src={cdnUrl(posterFor(item.src))}
                    alt={item.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="#1b3b2f"
                      >
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                      Sample reel
                    </p>
                    <p className="mt-1 text-sm text-white/90">{item.title}</p>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`${
                item.align === "right" ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
