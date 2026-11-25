"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { captureLeadAttribution, clearLeadAttribution } from "@/lib/lead-attribution";
import { getMeasurementConsent, getSavedMeasurementConsent, isMeasurementEnabled, saveMeasurementConsent, setRegionalMeasurementDefault, subscribeMeasurementConsent, type MeasurementConsent } from "@/lib/measurement-consent";

type Choice = MeasurementConsent | "undecided" | "loading";
type RegionMode = "opt-in" | "opt-out" | "loading";

const getChoiceSnapshot = (): Choice => getMeasurementConsent() ?? "undecided";
const getServerChoice = (): Choice => "loading";
const choiceButtonClass = "min-h-11 cursor-pointer border border-[#17382d] bg-[#17382d] px-5 py-2.5 text-sm font-semibold text-[#f4f2ec] transition-colors hover:bg-[#285343] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17382d]";

let googleTagInitialized = false;

function loadGoogleTag(gaId: string, adsId: string) {
  const tagId = gaId || adsId;
  if (!tagId || googleTagInitialized) return;

  googleTagInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  if (gaId) window.gtag("config", gaId);
  if (adsId) window.gtag("config", adsId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`;
  script.dataset.flarepixGoogleTag = "true";
  document.head.appendChild(script);
}

function clearGoogleAnalyticsCookies() {
  const hostname = window.location.hostname;
  const parentDomain = hostname === "flarepix.com" || hostname.endsWith(".flarepix.com") ? ".flarepix.com" : null;

  for (const part of document.cookie.split(";")) {
    const name = part.trim().split("=")[0];
    if (!/^(?:_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_|_gac_)/.test(name)) continue;

    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${hostname}`;
    if (parentDomain) document.cookie = `${name}=; Max-Age=0; path=/; domain=${parentDomain}`;
  }
}

export default function AnalyticsConsent({ gaId, adsId }: { gaId: string; adsId: string }) {
  const choice = useSyncExternalStore(subscribeMeasurementConsent, getChoiceSnapshot, getServerChoice);
  const [regionMode, setRegionMode] = useState<RegionMode>("loading");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/measurement-region", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Region lookup failed");
        return response.json() as Promise<{ mode?: string }>;
      })
      .then(({ mode }) => {
        if (!active) return;
        const resolvedMode = mode === "opt-out" ? "opt-out" : "opt-in";
        setRegionalMeasurementDefault(resolvedMode === "opt-out");
        setRegionMode(resolvedMode);
      })
      .catch(() => {
        if (!active) return;
        setRegionalMeasurementDefault(false);
        setRegionMode("opt-in");
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener("flarepix:open-analytics-preferences", openSettings);
    return () => window.removeEventListener("flarepix:open-analytics-preferences", openSettings);
  }, []);

  useEffect(() => {
    if (choice === "loading" || regionMode === "loading") return;

    if (isMeasurementEnabled()) {
      if (gaId) Object.assign(window, { [`ga-disable-${gaId}`]: false });
      captureLeadAttribution();
      loadGoogleTag(gaId, adsId);
    } else {
      if (gaId) Object.assign(window, { [`ga-disable-${gaId}`]: true });
      clearLeadAttribution();
      clearGoogleAnalyticsCookies();
      if (googleTagInitialized && getSavedMeasurementConsent() === "declined") window.location.reload();
    }
  }, [choice, regionMode, gaId, adsId]);

  function choose(nextChoice: MeasurementConsent) {
    saveMeasurementConsent(nextChoice);
    setSettingsOpen(false);
  }

  if (choice === "loading" || regionMode === "loading" || !settingsOpen) return null;

  const enabled = isMeasurementEnabled();

  return (
    <section
      aria-label="Analytics preferences"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-4xl border border-[#1b3b2f]/20 bg-[#f4f2ec] px-5 py-5 text-[#17382d] shadow-[0_20px_60px_rgba(15,39,30,0.22)] sm:px-7 sm:py-6"
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">Your analytics choice</p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
            Optional measurement is currently {enabled ? "on" : "off"}. This setting controls campaign attribution and Google tags when configured, without affecting the contact form.
          </p>
          <Link href="/privacy-policy" className="mt-2 inline-block text-sm font-medium underline underline-offset-4 hover:text-[#896333]">
            Privacy Policy
          </Link>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
          <button
            type="button"
            onClick={() => choose("declined")}
            className={choiceButtonClass}
          >
            Turn off analytics
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className={choiceButtonClass}
          >
            Turn on analytics
          </button>
        </div>
      </div>
    </section>
  );
}
