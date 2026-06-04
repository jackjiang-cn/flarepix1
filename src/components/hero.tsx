import CtaButton from "./cta-button";
import Image from "next/image";
import { cdnUrl } from "@/config/cdn";

/*
 * Hero image workflow
 * ──────────────────
 * To change images:
 * 1. Put new files in public/works/photo/  (photos)
 *    or public/works/ai/images/            (AI images)
 * 2. Edit the heroImages array below.
 *
 * Layout: CSS columns masonry — images render at their original
 * aspect ratios (portrait, landscape, square mixed naturally).
 * Gap between columns: gap-4. Rounded corners on each image.
 */

const heroImages = [
  { src: "/works/photo/womens-fashion/womens-fashion_1.jpg", alt: "Women's fashion photography" },
  { src: "/works/ai/images/ai-image-03.webp", alt: "AI product scene" },
  { src: "/works/photo/kids/kids_1.jpg", alt: "Kids products photography" },
  { src: "/works/ai/images/ai-image-04.webp", alt: "AI lifestyle imagery" },
  { src: "/works/photo/mens/mens_1.jpg", alt: "Men's fashion photography" },
  { src: "/works/ai/images/ai-image-06.webp", alt: "AI campaign visual" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background poster — local file, no CDN round-trip, optimized by Next.js Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/works/posters/hero-reel.jpg"
          alt=""
          fill
          className="object-cover opacity-30"
          loading="eager"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        {/* Video loads only after page interaction — not needed for LCP */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src={cdnUrl("/works/hero-reel.mp4")} type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 sm:pb-40 pt-20 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium text-[var(--amber)]">
              AI-powered product visuals for ecommerce
            </p>
            <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Product photography, video &amp;{" "}
              <span className="text-[var(--amber)]">AI imagery</span> — all in
              one place
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--muted)]">
              Real studio photography meets AI generation. Send us your products
              for studio photography — or generate lifestyle visuals remotely with
              AI. Built for Amazon and ecommerce brands.
            </p>
            <div className="mt-8 flex gap-4">
              <CtaButton href="/contact">Get a quote</CtaButton>
              <CtaButton href="/work" variant="outline">
                View our work
              </CtaButton>
            </div>
          </div>

          {/* 6-image masonry — images render at original ratios */}
          <div className="[column-fill:_balance] columns-2 sm:columns-3 gap-4">
            {heroImages.map((img, i) => (
              <div key={i} className="mb-4 overflow-hidden rounded-xl bg-[var(--surface)] break-inside-avoid">
                <Image
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto block"
                  width={600}
                  height={400}
                  loading={i < 3 ? "eager" : "lazy"}
                  priority={i < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
