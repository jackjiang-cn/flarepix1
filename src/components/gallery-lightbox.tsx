"use client";

import { useState, useEffect } from "react";
import { cdnUrl, posterFor } from "@/config/cdn";

type GalleryItem = {
  src: string;
  type: "image" | "video";
  alt?: string;
  title?: string;
  poster?: string;
};

function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4" onClick={onClose}>
      <div className="relative max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-[var(--amber)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        <img src={src} alt={alt} className="max-h-[85vh] w-auto rounded-lg object-contain" />
        <p className="mt-2 text-center text-white">{alt}</p>
      </div>
    </div>
  );
}

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black" onClick={onClose}>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-[var(--amber)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        <video controls autoPlay className="h-auto w-full max-h-[85vh] object-contain rounded-lg">
          <source src={src} type="video/mp4" />
        </video>
        <p className="mt-2 text-center text-white">{title}</p>
      </div>
    </div>
  );
}

export default function GalleryLightbox({ items, columns = 3, masonry = false }: { items: GalleryItem[]; columns?: number; masonry?: boolean }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const colClasses = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  if (masonry) {
    return (
      <>
        <div className="mt-6 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
          {items.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              onClick={() => setSelected(item)}
              className="group relative overflow-hidden rounded-lg bg-[var(--surface)] mb-4 break-inside-avoid"
            >
              {item.type === "video" ? (
                <>
                  {/* Poster thumbnail (first frame of video) — masonry variant keeps 16:9 aspect */}
                  <div className="relative w-full aspect-video">
                    <img
                      src={cdnUrl(item.poster ?? posterFor(item.src))}
                      alt={item.title || ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-90">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1b3b2f">
                        <polygon points="6 3 20 12 6 21 6 3"/>
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={cdnUrl(item.src)}
                    alt={item.alt || ""}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
                    </svg>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>

        {selected && (selected.type === "video" ? (
          <VideoModal
            src={cdnUrl(selected.src)}
            title={selected.title || "Video"}
            onClose={() => setSelected(null)}
          />
        ) : (
          <ImageModal
            src={cdnUrl(selected.src)}
            alt={selected.alt || ""}
            onClose={() => setSelected(null)}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div className={`mt-6 grid gap-4 ${colClasses}`}>
        {items.map((item, i) => (
          <button
            key={`${item.src}-${i}`}
            onClick={() => setSelected(item)}
            className="group relative overflow-hidden rounded-lg bg-[var(--surface)] aspect-video"
          >
            {item.type === "video" ? (
              <>
                {/* Poster thumbnail (first frame of video) — grid variant fills 16:9 button */}
                <img
                  src={cdnUrl(item.poster ?? posterFor(item.src))}
                  alt={item.title || ""}
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-90">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1b3b2f">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <>
                <img
                  src={cdnUrl(item.src)}
                  alt={item.alt || ""}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
                  </svg>
                </div>
              </>
            )}
          </button>
        ))}
      </div>

      {selected && (selected.type === "video" ? (
        <VideoModal
          src={cdnUrl(selected.src)}
          title={selected.title || "Video"}
          onClose={() => setSelected(null)}
        />
      ) : (
        <ImageModal
          src={cdnUrl(selected.src)}
          alt={selected.alt || ""}
          onClose={() => setSelected(null)}
        />
      ))}
    </>
  );
}