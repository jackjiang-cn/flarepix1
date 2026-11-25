"use client";

import { useState } from "react";
import Image from "next/image";
import { cdnUrl, posterFor, resolvePosterUrl } from "@/config/cdn";
import Lightbox from "./lightbox";
import VideoDialogPlayer from "./video-dialog-player";

type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt?: string;
  title?: string;
  poster?: string;
};

export default function GalleryLightbox({ items, columns = 3, masonry = false }: { items: GalleryItem[]; columns?: number; masonry?: boolean }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const colClasses = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";
  const layout = masonry ? "[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4" : "grid " + colClasses;
  const sizes = masonry ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
  const label = selected?.type === "video" ? selected.title || "Video preview" : selected?.alt || "Image preview";

  return (
    <>
      <div className={"mt-6 gap-4 " + layout}>
        {items.map((item, index) => {
          const isVideo = item.type === "video";
          const previewSrc = isVideo ? resolvePosterUrl(item.poster ?? posterFor(item.src)) : cdnUrl(item.src);
          const tileShape = masonry && !isVideo ? "aspect-[4/3]" : "aspect-video";

          return (
            <button
              type="button"
              key={item.src + "-" + index}
              aria-label={isVideo ? "Play " + (item.title || "video preview") : "View " + (item.alt || "image")}
              aria-haspopup="dialog"
              onClick={(event) => {
                event.currentTarget.focus({ preventScroll: true });
                setSelected(item);
              }}
              className={"group relative block w-full overflow-hidden rounded-lg bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] " + tileShape + (masonry ? " mb-4 break-inside-avoid" : "")}
            >
              <Image
                src={previewSrc}
                alt={(isVideo ? item.title : item.alt) || ""}
                fill
                loading="lazy"
                sizes={sizes}
                className="object-cover transition-transform motion-safe:group-hover:scale-105"
              />
              {isVideo ? (
                <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-90" aria-hidden="true">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform motion-safe:group-hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1b3b2f">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </span>
                </span>
              ) : (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <Lightbox
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={label}
        closeLabel={selected?.type === "video" ? "Close video" : "Close image"}
      >
        {selected?.type === "video" && (
          <VideoDialogPlayer key={selected.src} title={label} src={selected.src} poster={selected.poster ?? posterFor(selected.src)} />
        )}
        {selected?.type === "image" && (
          <figure className="max-w-5xl">
            <Image
              src={cdnUrl(selected.src)}
              alt={selected.alt || ""}
              width={1920}
              height={1080}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="max-h-[78dvh] w-auto rounded-lg object-contain"
            />
            {selected.alt && <figcaption className="mt-3 text-center text-sm">{selected.alt}</figcaption>}
          </figure>
        )}
      </Lightbox>
    </>
  );
}
