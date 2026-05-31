"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Lightbox from "./lightbox";
import CtaButton from "./cta-button";

type Image = { src: string; alt: string };

type Tab = {
  label: string;
  slug: string;
  images: Image[];
};

type Props = {
  title: string;
  description: string;
  tabs: Tab[];
  basePath?: string;
  linkPattern?: "query" | "path";
  configUrl?: string;
};

export default function PortfolioCarousel({
  title,
  description,
  tabs,
  basePath = "/work",
  linkPattern = "query",
  configUrl = "/content/display-order.json",
}: Props) {
  const [lightboxImg, setLightboxImg] = useState<Image | null>(null);
  const [activeTab, setActiveTab] = useState(0);
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
        if (data?.photoCategories) {
          setDisplayOrder(data.photoCategories);
        }
      })
      .catch(() => {
        // Silently fail, use default tabs
      });
  }, [configUrl]);

  // Get images for current tab - either from displayOrder or default tabs
  const currentImages = displayOrder && displayOrder[tabs[activeTab]?.slug]
    ? displayOrder[tabs[activeTab].slug].map((src, i) => ({
        src,
        alt: `${tabs[activeTab].label} photo ${i + 1}`,
      }))
    : tabs[activeTab]?.images || [];

  const getHref = (slug: string) =>
    linkPattern === "path"
      ? `${basePath}/${slug}`
      : `${basePath}?category=${slug}`;

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

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
          {description}
        </p>

        <nav className="mt-8 flex gap-4 overflow-x-auto no-scrollbar border-b border-white/[0.06] sm:gap-6">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => {
                setActiveTab(i);
                if (scrollRef.current) scrollRef.current.scrollLeft = 0;
              }}
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

        <div className="relative mt-6">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x-mandatory sm:gap-8"
          >
            {currentImages.map((img, idx) => (
              <button
                key={`${img.src}-${idx}`}
                onClick={() => setLightboxImg(img)}
                className="group aspect-[5/6] w-56 flex-none snap-start overflow-hidden rounded-lg bg-[var(--background)] sm:w-64"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
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
              background:
                "linear-gradient(to right, var(--surface), transparent)",
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
              background:
                "linear-gradient(to left, var(--surface), transparent)",
            }}
          >
            <span className="mr-3">
              <ArrowIcon dir="right" />
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <CtaButton href="/services#product-photography" variant="outline">
            View all
          </CtaButton>
        </div>
      </div>

      <Lightbox open={!!lightboxImg} onClose={() => setLightboxImg(null)}>
        {lightboxImg && (
          <img
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />
        )}
      </Lightbox>
    </section>
  );
}