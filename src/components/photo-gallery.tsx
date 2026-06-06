"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./lightbox";
import { cdnUrl } from "@/config/cdn";

type Photo = { src: string; alt: string };

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);

  return (
    <>
      <div className="[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            onClick={() => setLightboxPhoto(p)}
            className="group relative mb-4 block w-full break-inside-avoid cursor-zoom-in"
          >
            <div className="relative overflow-hidden rounded-lg bg-[var(--surface)]">
              <Image
                src={cdnUrl(p.src)}
                alt={p.alt}
                width={400}
                height={267}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox open={!!lightboxPhoto} onClose={() => setLightboxPhoto(null)}>
        {lightboxPhoto && (
          <Image
            src={cdnUrl(lightboxPhoto.src)}
            alt={lightboxPhoto.alt}
            width={1920}
            height={1280}
            className="max-h-[85vh] w-auto rounded-lg object-contain"
          />
        )}
      </Lightbox>
    </>
  );
}
