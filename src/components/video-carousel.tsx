"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CtaButton from "./cta-button";
import { videoProductionCategories, videoProductionSources } from "@/config/categories";
import { cdnUrl } from "@/config/cdn";

type Props = {
  configUrl?: string;
};

// Video Player Modal
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
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
          className="w-full rounded-lg"
        >
          <source src={cdnUrl(src)} type="video/mp4" />
        </video>
        <p className="mt-2 text-center text-white">{title}</p>
      </div>
    </div>
  );
}

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors group-hover:bg-white/20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-white/80"
    >
      {dir === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  </div>
);

export default function VideoCarousel({ configUrl = "/content/display-order.json" }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [displayOrder, setDisplayOrder] = useState<Record<string, string[]> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const checkRafRef = useRef<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Fetch display order config on mount
  useEffect(() => {
    fetch(configUrl)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (data?.videoCategories) {
          setDisplayOrder(data.videoCategories);
        }
      })
      .catch(() => {
        // Silently fail, use default videoProductionSources
      });
  }, [configUrl]);

  const videoTabs = videoProductionCategories;

  // Get videos for current tab - either from displayOrder or default
  const defaultVideos = (videoProductionSources[videoTabs[activeTab]?.slug] || []).map((src, i) => ({
    src,
    title: `${videoTabs[activeTab].label} video ${i + 1}`,
  }));

  const videos = displayOrder && displayOrder[videoTabs[activeTab]?.slug]
    ? displayOrder[videoTabs[activeTab].slug].map((src, i) => ({
        src,
        title: `${videoTabs[activeTab].label} video ${i + 1}`,
      }))
    : defaultVideos;

  const updateArrows = useCallback(() => {
    if (checkRafRef.current !== null) return;
    checkRafRef.current = requestAnimationFrame(() => {
      checkRafRef.current = null;
      const el = scrollRef.current;
      if (!el) return;
      const remaining = el.scrollWidth - el.scrollLeft - el.clientWidth;
      setCanScrollLeft((prev) =>
        el.scrollLeft > 10 ? true : el.scrollLeft <= 2 ? false : prev
      );
      setCanScrollRight((prev) =>
        remaining > 10 ? true : remaining <= 2 ? false : prev
      );
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      observer.disconnect();
    };
  }, [updateArrows, activeTab]);

  useEffect(() => {
    return () => {
      if (animRef.current !== null) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, []);

  const startScroll = useCallback((dir: "left" | "right") => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
    const el = scrollRef.current;
    if (!el) return;
    const delta = dir === "right" ? 1 : -1;
    let last = performance.now();
    const step = (now: number) => {
      if (now - last >= 480) {
        el.scrollBy({ left: delta, behavior: "smooth" });
        last = now;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  const stopScroll = useCallback(() => {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }, []);

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Video production
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
          Professional product videos across every category — shot in-studio or on-location.
        </p>

        {/* Tabs */}
        <nav className="mt-8 flex gap-4 overflow-x-auto no-scrollbar border-b border-white/[0.06] sm:gap-6">
          {videoTabs.map((tab, i) => (
            <button
              key={tab.slug}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 pb-3 text-sm transition-colors hover:text-white ${
                activeTab === i
                  ? "border-b-2 border-[var(--amber)] text-white"
                  : "text-[var(--muted)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Video grid with scroll arrows */}
        <div className="relative mt-6">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x-mandatory"
          >
            {videos.map((v, i) => (
              <button
                key={`${v.src}-${i}`}
                onClick={() => setSelectedVideo(v)}
                className="group relative aspect-video w-64 flex-none snap-start overflow-hidden rounded-xl bg-[var(--background)] sm:w-80"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                >
                  <source src={cdnUrl(v.src)} type="video/mp4" />
                </video>
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Left arrow */}
          <div
            onMouseEnter={() => startScroll("left")}
            onMouseLeave={stopScroll}
            className={`group absolute left-0 top-0 bottom-0 flex w-24 items-center justify-start transition-opacity duration-200 ${
              canScrollLeft
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              background: "linear-gradient(to right, var(--surface), transparent)",
            }}
          >
            <span className="ml-3">
              <ArrowIcon dir="left" />
            </span>
          </div>

          {/* Right arrow */}
          <div
            onMouseEnter={() => startScroll("right")}
            onMouseLeave={stopScroll}
            className={`group absolute right-0 top-0 bottom-0 flex w-24 items-center justify-end transition-opacity duration-200 ${
              canScrollRight
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              background: "linear-gradient(to left, var(--surface), transparent)",
            }}
          >
            <span className="mr-3">
              <ArrowIcon dir="right" />
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CtaButton href="/services#video-production" variant="outline">
            View all videos
          </CtaButton>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          src={selectedVideo.src}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
}