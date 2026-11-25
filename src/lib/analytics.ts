import { isMeasurementEnabled } from "@/lib/measurement-consent";

// GA4 / Google Ads event helpers.
// gtag is loaded according to the visitor's region and analytics setting.
// These helpers no-op safely when gtag isn't available (SSR, ad-blockers, missing env).

// Optional: set both values to fire a direct Google Ads lead conversion.
// If the same GA4 event is imported into Ads, keep only one action as Primary
// in Google Ads so a single form submission is not counted twice.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim();
const GADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GADS_CONVERSION_ID?.trim();
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL?.trim();

/** Fire a GA4 event. No-op if gtag isn't loaded. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !isMeasurementEnabled() || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Fire a lead conversion. Call this when a visitor submits the contact form.
 *
 * Two supported paths:
 *  1. GA4 `generate_lead`: link Google Ads and GA4, create a GA4 key event,
 *     then import it into Google Ads.
 *  2. Direct Google Ads conversion: set
 *     NEXT_PUBLIC_GADS_CONVERSION_ID + NEXT_PUBLIC_GADS_LEAD_LABEL in .env.local.
 */
export function trackLead(valueUsd?: number) {
  const valueParams =
    typeof valueUsd === "number" ? { value: valueUsd, currency: "USD" } : {};

  if (GA_MEASUREMENT_ID) {
    trackEvent("generate_lead", {
      send_to: GA_MEASUREMENT_ID,
      form_type: "contact",
      lead_source: "website",
      ...valueParams,
    });
  }

  if (GADS_CONVERSION_ID && GADS_LEAD_LABEL) {
    trackEvent("conversion", {
      send_to: `${GADS_CONVERSION_ID}/${GADS_LEAD_LABEL}`,
      transaction_id: crypto.randomUUID(),
      ...valueParams,
    });
  }
}
