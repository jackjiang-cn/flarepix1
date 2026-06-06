"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cdnUrl, posterFor } from "@/config/cdn";

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

export default function ClickableVideoCard({
  src,
  label,
  showLabel = true,
}: {
  src: string;
  label: string;
  showLabel?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative overflow-hidden rounded-lg aspect-video"
      >
        <Image
          src={cdnUrl(posterFor(src))}
          alt={label}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1b3b2f">
              <polygon points="6 3 20 12 6 21 6 3"/>
            </svg>
          </div>
        </div>
        {showLabel && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <p className="text-xs font-medium text-white/90">{label}</p>
          </div>
        )}
      </button>
      {open && (
        <VideoModal
          src={cdnUrl(src)}
          title={label}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
