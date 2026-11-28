"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { resolvePosterUrl } from "@/config/cdn";
import { homepageVideos } from "@/config/homepage-videos";
import Lightbox from "./lightbox";
import VideoDialogPlayer from "./video-dialog-player";

const featuredVideos = [
  {
    ...homepageVideos.boardGameTable,
    category: "Product demonstration",
  },
  {
    ...homepageVideos.donnerDrums,
    category: "Product commercial",
  },
  {
    ...homepageVideos.petWaterFountain,
    category: "Product demonstration",
  },
] as const;

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeVideo = activeIndex === null ? null : featuredVideos[activeIndex];

  return (
    <section id="selected-work" className="scroll-mt-20 border-t border-foreground/10 bg-[#ebe9e1] py-14 sm:py-20" aria-labelledby="selected-work-title">
      <div id="selected-films" className="mx-auto max-w-7xl scroll-mt-24 px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-6">
          <h2 id="selected-work-title" className="text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl">
            Selected Work
          </h2>
          <Link href="/work" className="inline-flex min-h-10 items-center text-sm font-semibold text-foreground underline decoration-foreground/35 underline-offset-6 transition-colors hover:text-[#77542d] focus-visible:outline-2 focus-visible:outline-offset-4">
            Explore All Work
          </Link>
        </div>

        <div className="grid gap-5 lg:h-[500px] lg:grid-cols-[2fr_1fr]">
          <VideoCard video={featuredVideos[0]} index={0} onSelect={setActiveIndex} featured />
          <div className="grid gap-5 lg:min-h-0 lg:grid-rows-2">
            <VideoCard video={featuredVideos[1]} index={1} onSelect={setActiveIndex} />
            <VideoCard video={featuredVideos[2]} index={2} onSelect={setActiveIndex} />
          </div>
        </div>
        <div className="mt-5 border-t border-foreground/15 pt-2">
          <Link
            href="/work#photography-work"
            className="inline-flex min-h-11 items-center text-sm font-medium text-muted underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            View Product Photography
          </Link>
        </div>
      </div>

      <Lightbox
        open={activeVideo !== null}
        onClose={() => setActiveIndex(null)}
        label={activeVideo?.title}
        closeLabel="Close video"
      >
        {activeVideo && (
          <VideoDialogPlayer key={activeVideo.src} {...activeVideo} />
        )}
      </Lightbox>
    </section>
  );
}

type FeaturedVideo = (typeof featuredVideos)[number];

function VideoCard({
  video,
  index,
  onSelect,
  featured = false,
}: {
  video: FeaturedVideo;
  index: number;
  onSelect: (index: number) => void;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.currentTarget.focus({ preventScroll: true });
        onSelect(index);
      }}
      aria-label={`Play ${video.title}`}
      aria-haspopup="dialog"
      className="group relative block aspect-video w-full overflow-hidden rounded-md bg-[#d8d6cc] text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:aspect-auto lg:h-full"
    >
      <Image
        src={resolvePosterUrl(video.poster)}
        alt=""
        fill
        loading="lazy"
        sizes={featured ? "(min-width: 1024px) 64vw, 100vw" : "(min-width: 1024px) 32vw, 100vw"}
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden="true" />
      <span className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[var(--foreground)]" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5"><path d="m8 5 11 7-11 7V5Z" /></svg>
      </span>
      <span className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">{video.category}</span>
        <span className={`mt-1 block font-semibold tracking-[-0.03em] ${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>{video.title}</span>
      </span>
    </button>
  );
}
