"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cdnUrl } from "@/config/cdn";
import Lightbox from "./lightbox";
import VideoDialogPlayer from "./video-dialog-player";

// These three existing videos hold the layout until the final cases are selected.
const featuredVideos = [
  {
    title: "Brand film",
    category: "Featured video",
    src: "/works/brand-film/brand-film-02-web.mp4?v=3caff7ab",
    poster: "/works/posters/brand-film-02.jpg",
  },
  {
    title: "Consumer electronics",
    category: "Video production",
    src: "/works/video/Electronics/product-video-10.m4v",
    poster: "/works/posters/product-video-10.jpg",
  },
  {
    title: "Home & kitchen",
    category: "Video production",
    src: "/works/video/Home & Kitchen/product-video-02.mp4",
    poster: "/works/posters/product-video-02.jpg",
  },
] as const;

export default function SelectedWork() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeVideo = activeIndex === null ? null : featuredVideos[activeIndex];

  return (
    <section id="selected-work" className="bg-[var(--background)] py-20 sm:py-28" aria-labelledby="selected-work-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#1b3b2f]/15 pb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Video Production</p>
            <h2 id="selected-work-title" className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-5xl">
              Selected Work
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              A preview of our video production work.
            </p>
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 border-b border-[var(--foreground)] pb-1 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333]">
            Explore All Work <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:h-[500px] lg:grid-cols-[2fr_1fr]">
          <VideoCard video={featuredVideos[0]} index={0} onSelect={setActiveIndex} featured />
          <div className="grid gap-5 lg:min-h-0 lg:grid-rows-2">
            <VideoCard video={featuredVideos[1]} index={1} onSelect={setActiveIndex} />
            <VideoCard video={featuredVideos[2]} index={2} onSelect={setActiveIndex} />
          </div>
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
        src={cdnUrl(video.poster)}
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
