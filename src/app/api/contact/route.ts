import { NextResponse } from "next/server";
import { Resend } from "resend";

const attributionLabels = {
  gclid: "Google click ID",
  gbraid: "Google app click ID",
  wbraid: "Google web-to-app click ID",
  utm_source: "UTM source",
  utm_medium: "UTM medium",
  utm_campaign: "UTM campaign",
  utm_id: "UTM campaign ID",
  utm_term: "UTM term",
  utm_content: "UTM content",
  landing_page: "Landing page",
  referrer_host: "Referrer",
} as const;

type AttributionKey = keyof typeof attributionLabels;

const projectTypes = new Set([
  "Commercials & Brand Films",
  "Advertising Creatives",
  "Product Videos & Demos",
  "AI Video",
  "Photography",
  "Not sure yet",
]);

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = readText(body.name);
  const email = readText(body.email);
  const brand = readText(body.brand);
  const services = normalizeServices(body.services, body.service);
  const message = readText(body.message);
  const targetDate = readText(body.targetDate);
  const referenceLink = readText(body.referenceLink);
  const attribution = sanitizeAttribution(body.attribution);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and project brief are required." },
      { status: 400 }
    );
  }

  if (
    name.length > 120 || email.length > 254 || brand.length > 160 ||
    message.length > 5000 || targetDate.length > 120 || referenceLink.length > 1000 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Please check the email address and field lengths, then try again." },
      { status: 400 }
    );
  }

  if (!resend) {
    console.error("[Contact] RESEND_API_KEY not configured");
    return deliveryFailure();
  }

  const subject = `New FlarePix project brief from ${name.replace(/[\r\n]/g, " ")}`;
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New project brief</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Name</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Brand / Company</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(brand) || "—"}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Project type</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(services.join(", ")) || "Not specified"}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Target date</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(targetDate) || "—"}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Reference link</td><td style="padding: 6px 0; font-size: 14px; word-break: break-all;">${escapeHtml(referenceLink) || "—"}</td></tr>
      </table>
      ${renderAttribution(attribution)}
      <h3 style="margin: 20px 0 8px; font-size: 14px; color: #666;">Project brief</h3>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 6px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "FlarePix Contact <contact@flarepix.com>",
      to: "hello@flarepix.com",
      replyTo: email,
      subject,
      html,
    });

    if (error) {
      console.error("[Contact] Resend error:", error);
      return deliveryFailure();
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return deliveryFailure();
  }
}

function deliveryFailure() {
  return NextResponse.json({ error: "We couldn’t send your brief. Please try again." }, { status: 500 });
}

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeServices(value: unknown, legacyValue: unknown): string[] {
  if (Array.isArray(value)) {
    return [...new Set(value.filter((item): item is string => typeof item === "string" && projectTypes.has(item)))];
  }
  const legacy = readText(legacyValue);
  return legacy ? [legacy.slice(0, 120)] : [];
}

function sanitizeAttribution(value: unknown): Partial<Record<AttributionKey, string>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const input = value as Record<string, unknown>;
  return Object.fromEntries(
    (Object.keys(attributionLabels) as AttributionKey[]).flatMap((key) => {
      const raw = input[key];
      if (typeof raw !== "string") return [];
      const normalized = raw.trim().slice(0, 500);
      return normalized ? [[key, normalized]] : [];
    })
  );
}

function renderAttribution(attribution: Partial<Record<AttributionKey, string>>): string {
  const rows = (Object.keys(attributionLabels) as AttributionKey[])
    .flatMap((key) => {
      const value = attribution[key];
      if (!value) return [];
      return [
        `<tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">${attributionLabels[key]}</td><td style="padding: 6px 0; font-size: 14px; word-break: break-all;">${escapeHtml(value)}</td></tr>`,
      ];
    })
    .join("");

  if (!rows) return "";

  return `
    <h3 style="margin: 20px 0 8px; font-size: 14px; color: #666;">Attribution</h3>
    <table style="width: 100%; border-collapse: collapse;">${rows}</table>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
