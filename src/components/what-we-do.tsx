import { cdnUrl } from "@/config/cdn";

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
              className={`overflow-hidden rounded-2xl bg-[var(--surface)] ${
                item.kind === "video" ? "aspect-video" : "aspect-[4/3]"
              } ${item.align === "right" ? "lg:order-2" : "lg:order-1"}`}
            >
              {item.kind === "image" ? (
                <img
                  src={cdnUrl(item.src)}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={cdnUrl(item.src)} type="video/mp4" />
                </video>
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
