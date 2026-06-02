import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const service = String(body.service ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!email || !message) {
    return NextResponse.json(
      { error: "Email and message are required." },
      { status: 400 }
    );
  }

  if (!resend) {
    console.error("[Contact] RESEND_API_KEY not configured");
    return NextResponse.json(
      { error: "Email service not configured. Please email us directly." },
      { status: 500 }
    );
  }

  const subject = `New contact form submission${name ? ` from ${name}` : ""}`;
  const html = `
    <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; color: #1a1a1a;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New contact form submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Name</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(name) || "—"}</td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Email</td><td style="padding: 6px 0; font-size: 14px;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 6px 12px 6px 0; color: #666; font-size: 14px;">Service</td><td style="padding: 6px 0; font-size: 14px;">${escapeHtml(service) || "—"}</td></tr>
      </table>
      <h3 style="margin: 20px 0 8px; font-size: 14px; color: #666;">Project details</h3>
      <div style="padding: 12px; background: #f5f5f5; border-radius: 6px; font-size: 14px; white-space: pre-wrap;">${escapeHtml(message)}</div>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">Reply directly to this email to respond to ${escapeHtml(name) || "the sender"}.</p>
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
      return NextResponse.json(
        { error: "Failed to send message. Please try again or email us directly." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email us directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
