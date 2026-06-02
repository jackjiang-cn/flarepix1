"use client";

import { useState, useRef, useEffect } from "react";
import CtaButton from "./cta-button";
import { cdnUrl } from "@/config/cdn";

function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-[var(--amber)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
      <video
        ref={videoRef}
        controls
        autoPlay
        className="h-auto w-full max-h-[90vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {title}
      </div>
    </div>
  );
}

export default function VideoSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[var(--background)] py-20 sm:py-40">
      <div className="relative mx-auto max-w-7xl">
        <button
          onClick={() => setShowModal(true)}
          className="group relative flex w-full overflow-hidden aspect-video lg:aspect-[21/9]"
        >
          {/* Placeholder background (replaces 80MB autoplay video) */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b3b2f] via-[#2d5a47] to-[#0f2a22] transition-transform group-hover:scale-105" />

          {/* Subtle film-grain pattern using SVG */}
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(184,151,92,0.15), transparent 50%), radial-gradient(circle at 70% 60%, rgba(184,151,92,0.1), transparent 50%)",
            }}
          />

          {/* Centered large play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110 lg:h-24 lg:w-24">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#1b3b2f">
                <polygon points="6 3 20 12 6 21 6 3"/>
              </svg>
            </div>
          </div>

          {/* Gradient overlay + text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-end p-8 lg:p-16">
            <div className="w-full max-w-md">
              <p className="mb-3 text-sm font-medium text-[var(--amber)]">
                Premium tier
              </p>
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                Brand Film Production
              </h2>
              <p className="mt-4 text-[var(--muted)] lg:text-lg">
                Cinematic brand films and commercial productions for your biggest
                launches. Full creative direction, professional lighting, and
                post-production included — everything you need for your hero products.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <CtaButton href="/contact">Get a quote</CtaButton>
                <CtaButton href="/services/brand-film" variant="outline">
                  View showcase
                </CtaButton>
              </div>
            </div>
          </div>
        </button>
      </div>

      {showModal && (
        <VideoModal
          src={cdnUrl("/works/brand-film/brand-film-07.m4v")}
          title="Brand Film Production"
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
}
