"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import CtaButton from "./cta-button";
import { navigation } from "@/config/contact";

const serviceLinks = [
  { label: "Video production", href: "/services#video-production" },
  { label: "Product photography", href: "/services#product-photography" },
  { label: "Brand Film Production", href: "/services/brand-film" },
  { label: "AI Imagery", href: "/services/ai-imagery" },
  { label: "AI Video", href: "/services/ai-video" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDropdown = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  }, []);

  const hideDropdown = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 100);
  }, []);

  const cancelHide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur border-b border-black/[0.08]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Flare<span className="text-[var(--amber)]">Pix</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Services with dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={showDropdown}
              onMouseLeave={hideDropdown}
              className="flex items-center gap-1 text-sm font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Services
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div
                className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-black/[0.08] bg-[var(--surface)] p-2 shadow-lg shadow-[var(--foreground)]/10"
                onMouseEnter={cancelHide}
                onMouseLeave={hideDropdown}
              >
                {serviceLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="block rounded-lg px-4 py-2.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] hover:bg-black/[0.04]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navigation.main
            .filter((item) => item.label !== "Services")
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <div className="hidden md:block">
          <CtaButton href="/contact">Get a quote</CtaButton>
        </div>

        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-5 bg-[var(--foreground)] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`block h-px w-5 bg-[var(--foreground)] ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-px w-5 bg-[var(--foreground)] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-black/[0.08] bg-[var(--background)] px-6 py-6 md:hidden">
          {navigation.main.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <CtaButton href="/contact" className="mt-2 w-full">
            Get a quote
          </CtaButton>
        </nav>
      )}
    </header>
  );
}