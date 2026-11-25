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
      {/* Background video — poster shows briefly before play, then video plays */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={cdnUrl("/works/posters/hero-reel.jpg")}
          className="h-full w-full object-cover opacity-30"
        >
          <source src={cdnUrl("/works/hero-reel.mp4")} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[#f7f5ef]/75 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#f7f5ef]/95 lg:via-[#f7f5ef]/55 lg:to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-28 sm:pb-40 pt-20 sm:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium text-[#77542d]">
              Product Content Studio
            </p>
            <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-[#16392e] sm:text-5xl">
              Make Your Product{" "}
              <span className="text-[#896333]">Impossible</span> to Ignore.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#344b42]">
              Product videos, demonstrations, advertising creatives, and
              photography for consumer brands. We show what your product does
              and why it matters.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <CtaButton href="/contact" className="min-h-12 w-full sm:w-auto">Discuss a Project</CtaButton>
              <CtaButton href="/work" variant="outline" className="min-h-12 w-full sm:w-auto">
                View Our Work
              </CtaButton>
            </div>
          </div>

          {/* 6-image masonry — images render at original ratios */}
          <div className="[column-fill:_balance] columns-2 sm:columns-3 gap-4">
            {heroImages.map((img, i) => (
               <div key={i} className="mb-4 overflow-hidden rounded-xl bg-[var(--surface)] break-inside-avoid">
                <Image
                  src={cdnUrl(img.src)}
                  alt={img.alt}
                  className="w-full h-auto block object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  width={600}
                  height={400}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
