import { isMeasurementEnabled } from "@/lib/measurement-consent";

const STORAGE_KEY = "flarepix_lead_attribution";

const MARKETING_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
] as const;

type MarketingKey = (typeof MARKETING_KEYS)[number];

export type LeadAttribution = Partial<Record<MarketingKey, string>> & {
  landing_page?: string;
  referrer_host?: string;
};

const MAX_VALUE_LENGTH = 500;

function normalizeValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().slice(0, MAX_VALUE_LENGTH);
  return normalized || undefined;
}

function sanitizeAttribution(value: unknown): LeadAttribution {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const input = value as Record<string, unknown>;
  const attribution: LeadAttribution = {};

  for (const key of MARKETING_KEYS) {
    const normalized = normalizeValue(input[key]);
    if (normalized) attribution[key] = normalized;
  }

  const landingPage = normalizeValue(input.landing_page);
  const referrerHost = normalizeValue(input.referrer_host);
  if (landingPage) attribution.landing_page = landingPage;
  if (referrerHost) attribution.referrer_host = referrerHost;

  return attribution;
}

export function getLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined" || !isMeasurementEnabled()) return {};

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? sanitizeAttribution(JSON.parse(stored)) : {};
  } catch {
    return {};
  }
}

export function captureLeadAttribution() {
  if (typeof window === "undefined" || !isMeasurementEnabled()) return;

  const existing = getLeadAttribution();
  const params = new URLSearchParams(window.location.search);
  const next: LeadAttribution = { ...existing };

  for (const key of MARKETING_KEYS) {
    if (next[key]) continue;
    const normalized = normalizeValue(params.get(key));
    if (normalized) next[key] = normalized;
  }

  if (!next.landing_page) {
    next.landing_page = window.location.pathname.slice(0, MAX_VALUE_LENGTH);
  }

  if (!next.referrer_host && document.referrer) {
    try {
      const referrer = new URL(document.referrer);
      if (referrer.hostname !== window.location.hostname) {
        next.referrer_host = referrer.hostname.slice(0, MAX_VALUE_LENGTH);
      }
    } catch {
      // Ignore malformed referrer values.
    }
  }

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Attribution is best-effort; storage restrictions must not block the form.
  }
}

export function clearLeadAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage restrictions should not block a visitor's choice.
  }
}
