"use client";

import { useState, useRef, useEffect } from "react";
import CtaButton from "./cta-button";
import { cdnUrl } from "@/config/cdn";

const aiImages = [
  { src: "/works/ai/images/ai-image-01.webp", alt: "AI product image" },
  { src: "/works/ai/images/ai-image-02.webp", alt: "AI on-model fashion" },
  { src: "/works/ai/images/ai-image-03.webp", alt: "AI lifestyle scene" },
  { src: "/works/ai/images/ai-image-04.webp", alt: "AI campaign visual" },
  { src: "/works/ai/images/ai-image-05.webp", alt: "AI product in scene" },
  { src: "/works/ai/images/ai-image-06.webp", alt: "AI virtual try-on" },
];

const aiVideos = [
  { src: "/works/ai/videos/ai-video-01.mp4", title: "AI Video 1" },
  { src: "/works/ai/videos/ai-video-02.mp4", title: "AI Video 2" },
  { src: "/works/ai/videos/ai-video-03.mp4", title: "AI Video 3" },
  { src: "/works/ai/videos/ai-video-04.mp4", title: "AI Video 4" },
];

// Image Lightbox Modal
function ImageModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[var(--amber)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        <img
          src={cdnUrl(src)}
          alt={alt}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />
        <p className="mt-2 text-center text-white">{alt}</p>
      </div>
    </div>
  );
}

// Video Modal
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
      <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[var(--amber)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </button>
        <video
          ref={videoRef}
          controls
          autoPlay
          className="h-auto w-full max-h-[85vh] object-contain rounded-lg"
        >
          <source src={cdnUrl(src)} type="video/mp4" />
        </video>
        <p className="mt-2 text-center text-white">{title}</p>
      </div>
    </div>
  );
}

export default function AiShowcase() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-40">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            AI Media Production
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Real product photography meets AI-generated scenes and models
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <CtaButton href="/contact">Get a quote</CtaButton>
            <CtaButton href="/services" variant="outline">
              Learn more
            </CtaButton>
          </div>
        </div>

        {/* AI Images */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {aiImages.map((img) => (
            <button
              key={img.src}
              onClick={() => setSelectedImage(img)}
              className="group relative overflow-hidden rounded-lg bg-[var(--background)] aspect-[4/5]"
            >
              <img
                src={cdnUrl(img.src)}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
              {/* Zoom icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6"/><path d="M8 11h6"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* AI Videos */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-center">
            AI-Generated Videos
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {aiVideos.map((v, i) => (
              <button
                key={v.src}
                onClick={() => setSelectedVideo(v)}
                className="group relative overflow-hidden rounded-lg aspect-video"
              >
                {/* Placeholder gradient (replaces autoplay video — loads only when clicked) */}
                <div
                  className="absolute inset-0 transition-transform group-hover:scale-105"
                  style={{
                    background: `linear-gradient(${135 + i * 30}deg, #1b3b2f 0%, #2d5a47 50%, #0f2a22 100%)`,
                  }}
                />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    background: `radial-gradient(circle at ${35 + i * 10}% ${45 + i * 5}%, rgba(184,151,92,0.5), transparent 60%)`,
                  }}
                />
                {/* Centered play icon */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-90">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#1b3b2f">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
                {/* Title label */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-left">
                  <p className="text-sm font-medium text-white/90">{v.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <ImageModal
          src={cdnUrl(selectedImage.src)}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          src={cdnUrl(selectedVideo.src)}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}