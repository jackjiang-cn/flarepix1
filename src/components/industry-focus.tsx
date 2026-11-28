"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homepageVideos } from "@/config/homepage-videos";
import Lightbox from "./lightbox";
import VideoDialogPlayer from "./video-dialog-player";

type Industry = {
  title: string;
  description: string;
  video: { title: string; src: string; poster: string };
  href: string;
};

const industries: Industry[] = [
  {
    title: "Small Appliances",
    description: "Show everyday use, key functions, and the details that make a product worth choosing.",
    video: homepageVideos.momcozyD8,
    href: "/product-categories#small-appliances",
  },
  {
    title: "Fashion & Apparel",
    description: "Show fit, movement, texture, and styling in context.",
    video: homepageVideos.degaiaMenswear,
    href: "/product-categories#fashion-apparel",
  },
  {
    title: "Consumer Electronics",
    description: "Make features, interfaces, and real-world use easy to understand.",
    video: homepageVideos.robotDog,
    href: "/product-categories#consumer-electronics",
  },
];

export default function IndustryFocus() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeIndustry = activeIndex === null ? null : industries[activeIndex];

  return (
    <section id="industries" className="scroll-mt-20 bg-[var(--background)] py-20 sm:py-28" aria-labelledby="industries-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">
            Product Categories
          </p>
          <h2 id="industries-title" className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-5xl">
            Content for the products you sell.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            We plan video and visual content around how each product is used, demonstrated, and bought.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          {industries.map((industry, index) => {
            const featured = index === 0;

            return (
              <article
                key={industry.title}
                className={`overflow-hidden rounded-lg ${featured ? "bg-[#17382d] text-[#f4f2ec]" : "border border-[#1b3b2f]/15 bg-[var(--surface)] text-[var(--foreground)]"}`}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.focus({ preventScroll: true });
                    setActiveIndex(index);
                  }}
                  aria-label={`Play video preview for ${industry.title}`}
                  aria-haspopup="dialog"
                  className="group relative block aspect-video w-full overflow-hidden bg-[#102820] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:aspect-auto lg:h-[220px]"
                >
                  <Image
                    src={industry.video.poster}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]"
                  />
                  <span className="absolute inset-0 bg-black/15" aria-hidden="true" />
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-black/25 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[var(--foreground)]" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5"><path d="m8 5 11 7-11 7V5Z" /></svg>
                  </span>
                </button>
                <div className="p-6 sm:p-7">
                  <p className={`text-xs font-semibold tracking-[0.18em] ${featured ? "text-[#cfb077]" : "text-[#896333]"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">
                    {industry.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed sm:text-base ${featured ? "text-[#e2e6de]" : "text-[var(--muted)]"}`}>
                    {industry.description}
                  </p>
                  <Link
                    href={industry.href}
                    className={`mt-5 inline-flex min-h-9 items-center gap-2 border-b text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 ${featured ? "border-[#cfb077] text-[#f4f2ec] hover:text-[#cfb077] focus-visible:outline-[#cfb077]" : "border-[var(--foreground)] text-[var(--foreground)] hover:text-[#896333] focus-visible:outline-[var(--foreground)]"}`}
                  >
                    Explore Category <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-9 flex flex-col gap-5 border-t border-[#1b3b2f]/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--muted)]">
            Home &amp; Lifestyle, and more
          </p>
          <Link
            href="/work"
            className="inline-flex min-h-11 items-center gap-3 self-start border-b border-[var(--foreground)] pb-1 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
          >
            Explore All Work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <Lightbox
        open={activeIndustry !== null}
        onClose={() => setActiveIndex(null)}
        label={activeIndustry?.video.title}
        closeLabel="Close video"
      >
        {activeIndustry && (
          <VideoDialogPlayer key={activeIndustry.video.src} {...activeIndustry.video} />
        )}
      </Lightbox>
    </section>
  );
}
