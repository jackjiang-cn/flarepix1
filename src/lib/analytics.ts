// GA4 / Google Ads event helpers.
// gtag is loaded conditionally in src/app/layout.tsx (only when NEXT_PUBLIC_GA_ID is set).
// These helpers no-op safely when gtag isn't available (SSR, ad-blockers, missing env).

// Optional: set these in .env.local to ALSO fire a direct Google Ads conversion.
const GADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID; // e.g. "AW-123456789"
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL; // e.g. "abcdef"

/** Fire a GA4 event. No-op if gtag isn't loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Fire a lead conversion. Call this when a visitor submits the contact form.
 *
 * Two paths (both fire, for redundancy):
 *  1. GA4 `generate_lead` event — RECOMMENDED. Link Google Ads <-> GA4,
 *     then in GA4 Admin -> Events, mark `generate_lead` as a Conversion.
 *     Ads imports it automatically — no further code change needed.
 *  2. (Optional) Direct Google Ads conversion — set
 *     NEXT_PUBLIC_GADS_CONVERSION_ID + NEXT_PUBLIC_GADS_LEAD_LABEL in .env.local.
 */
export function trackLead(valueUsd = 1) {
  trackEvent("generate_lead", { value: valueUsd, currency: "USD" });
  if (GADS_CONVERSION_ID && GADS_LEAD_LABEL) {
    trackEvent("conversion", {
      send_to: `${GADS_CONVERSION_ID}/${GADS_LEAD_LABEL}`,
      value: valueUsd,
      currency: "USD",
    });
  }
}
