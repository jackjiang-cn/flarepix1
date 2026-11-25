"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import CtaButton from "./cta-button";
import { navigation } from "@/config/contact";

const serviceLinks = [
  { label: "Commercials & Brand Films", href: "/services#brand-film" },
  { label: "Advertising Creatives", href: "/services#advertising-creatives" },
  { label: "Product Videos & Demos", href: "/services#product-demonstrations" },
  { label: "AI Video Production", href: "/services#ai-video" },
  { label: "Product Photography", href: "/services#product-photography" },
];

const desktopFocusClass = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const desktopServicesButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur border-b border-black/[0.08]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Flare<span className="text-[var(--amber)]">Pix</span>
        </Link>

        <nav className="hidden items-center gap-4 md:flex lg:gap-8">
          {/* Services with dropdown */}
          <div
            className="relative"
            onMouseLeave={(event) => {
              if (!event.currentTarget.contains(document.activeElement)) setDropdownOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setDropdownOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Escape" || !dropdownOpen) return;
              event.preventDefault();
              event.stopPropagation();
              setDropdownOpen(false);
              desktopServicesButtonRef.current?.focus();
            }}
          >
            <div className="flex items-center">
              <Link
                href="/services"
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(false)}
                className={`text-sm font-medium tracking-wide text-[var(--muted)] transition-colors hover:text-[var(--foreground)] ${desktopFocusClass}`}
              >
                Services
              </Link>
              <button
                ref={desktopServicesButtonRef}
                type="button"
                aria-label="Service links"
                aria-expanded={dropdownOpen}
                aria-controls="desktop-service-links"
                onClick={() => setDropdownOpen((isOpen) => !isOpen)}
                className={`inline-flex size-6 cursor-pointer items-center justify-center rounded text-[var(--muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--foreground)] ${desktopFocusClass}`}
              >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <div id="desktop-service-links" hidden={!dropdownOpen} className="absolute left-0 top-full z-50 w-72 pt-2">
              <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-2 shadow-lg shadow-[var(--foreground)]/10">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className={`block rounded-lg px-4 py-2.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] hover:bg-black/[0.04] ${desktopFocusClass}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  href="/product-categories"
                  className={`mt-2 block border-t border-[#1b3b2f]/15 px-4 pb-2 pt-4 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] ${desktopFocusClass}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  Product Categories <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/how-we-work"
                  className={`block px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] ${desktopFocusClass}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  How We Work <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  href="/faq"
                  className={`block px-4 py-2.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] ${desktopFocusClass}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  FAQ <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
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
          <CtaButton href="/contact">Discuss a Project</CtaButton>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] md:hidden"
          onClick={() => {
            if (open) setMobileServicesOpen(false);
            setOpen(!open);
          }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
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

      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`${open ? "flex" : "hidden"} max-h-[calc(100dvh-4.5rem)] flex-col gap-1 overflow-y-auto border-t border-black/[0.08] bg-[var(--background)] px-6 py-4 md:hidden`}>
          {navigation.main.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between border-b border-[#1b3b2f]/10">
                <Link
                  href={item.href}
                  className="flex min-h-11 flex-1 items-center text-sm font-medium text-[var(--foreground)] transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                  onClick={() => {
                    setOpen(false);
                    setMobileServicesOpen(false);
                  }}
                >
                  {item.label}
                </Link>
                {item.label === "Services" && (
                  <button
                    type="button"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--foreground)] transition-colors hover:bg-[#1b3b2f]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    aria-label={mobileServicesOpen ? "Hide service links" : "Show service links"}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-service-links"
                  >
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}>
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                )}
              </div>
              {item.label === "Services" && (
                <div id="mobile-service-links" className={`${mobileServicesOpen ? "flex" : "hidden"} mb-3 ml-1 mt-2 flex-col border-l-2 border-[var(--amber)] pl-4`}>
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      className="flex min-h-11 items-center text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                      onClick={() => {
                        setOpen(false);
                        setMobileServicesOpen(false);
                      }}
                    >
                      {service.label}
                    </Link>
                  ))}
                  <Link
                    href="/product-categories"
                    className="mt-2 flex min-h-11 items-center border-t border-[#1b3b2f]/10 text-sm font-medium text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    Product Categories
                  </Link>
                  <Link
                    href="/how-we-work"
                    className="flex min-h-11 items-center text-sm font-medium text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    How We Work
                  </Link>
                  <Link
                    href="/faq"
                    className="flex min-h-11 items-center text-sm font-medium text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
          ))}
          <CtaButton href="/contact" className="mt-2 w-full">
            Discuss a Project
          </CtaButton>
      </nav>
    </header>
  );
}
