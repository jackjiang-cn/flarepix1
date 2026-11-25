"use client";

import { useState } from "react";
import ServiceVideoPreview from "@/components/service-video-preview";
import type { WorkVideo } from "@/config/work-videos";

const filters = [
  { value: "all", label: "All Video" },
  { value: "film", label: "Brand Films" },
  { value: "advertising", label: "Advertising Creatives" },
  { value: "demonstration", label: "Product Demonstrations" },
  { value: "ai", label: "AI Video" },
] as const;

export default function WorkVideoGallery({ videos, initialFilter }: {
  videos: readonly WorkVideo[];
  initialFilter?: string;
}) {
  const [filter, setFilter] = useState(filters.find(({ value }) => value === initialFilter)?.value ?? "all");
  const visible = filter === "all" ? videos : videos.filter((video) => video.types.includes(filter));

  return (
    <section id="browse-video-work" className="scroll-mt-24 border-t border-[#1b3b2f]/15 py-16 sm:py-20" aria-labelledby="browse-work-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Browse Work</p>
          <h2 id="browse-work-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Browse video work by type.</h2>
        </div>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter video work">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              aria-pressed={filter === item.value}
              className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] ${
                filter === item.value
                  ? "border-[#17382d] bg-[#17382d] text-white"
                  : "border-[#1b3b2f]/20 text-[var(--foreground)] hover:border-[#1b3b2f]/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]" role="status">
          {visible.length} {visible.length === 1 ? "video" : "videos"}
        </p>
        <div className="mt-5 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((video) => (
            <article key={video.src}>
              <ServiceVideoPreview title={video.title} src={video.src} poster={video.poster} />
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold tracking-[-0.025em]">{video.title}</h3>
                <span className="shrink-0 pt-1 text-xs text-[var(--muted)]">{video.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
