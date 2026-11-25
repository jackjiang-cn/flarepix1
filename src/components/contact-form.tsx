"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { trackLead } from "@/lib/analytics";
import { getLeadAttribution } from "@/lib/lead-attribution";
import { contact } from "@/config/contact";

const projectTypes = [
  "Commercials & Brand Films",
  "Advertising Creatives",
  "Product Videos & Demos",
  "AI Video",
  "Photography",
  "Not sure yet",
] as const;

const inputClass =
  "mt-2 block min-h-12 w-full rounded-md border border-[#1b3b2f]/20 bg-white px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[#78857d] focus:border-[#896333] focus:outline-2 focus:outline-offset-1 focus:outline-[#896333] disabled:opacity-50";
const labelClass = "block text-sm font-semibold text-[var(--foreground)]";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    submitting.current = true;
    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(event.currentTarget);
    const data = {
      name: form.get("name")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      brand: form.get("brand")?.toString() ?? "",
      services: form.getAll("services").map(String),
      message: form.get("message")?.toString() ?? "",
      targetDate: form.get("targetDate")?.toString() ?? "",
      referenceLink: form.get("referenceLink")?.toString() ?? "",
      attribution: getLeadAttribution(),
    };

    let accepted = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const body = await response.json().catch(() => null);
          if (typeof body?.error === "string") setErrorMsg(body.error);
        }
        setStatus("error");
        return;
      }
      accepted = true;
    } catch {
      setStatus("error");
      return;
    } finally {
      if (!accepted) submitting.current = false;
    }

    setStatus("sent");

    try {
      trackLead();
    } catch {
      console.warn("Could not record the contact conversion.");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-md border-l-2 border-[var(--amber)] bg-[var(--surface)] px-6 py-10 sm:px-9">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#896333]">Brief Received</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">Thanks—your brief has been sent.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--muted)]">We&apos;ll review it and reply by email.</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Name *
          <input className={inputClass} type="text" name="name" autoComplete="name" maxLength={120} required disabled={sending} placeholder="Your name" />
        </label>
        <label className={labelClass}>
          Email *
          <input className={inputClass} type="email" name="email" autoComplete="email" maxLength={254} required disabled={sending} placeholder="you@company.com" />
        </label>
      </div>

      <label className={labelClass}>
        Brand / Company <span className="font-normal text-[var(--muted)]">(optional)</span>
        <input className={inputClass} type="text" name="brand" autoComplete="organization" maxLength={160} disabled={sending} placeholder="Your brand or company" />
      </label>

      <fieldset disabled={sending}>
        <legend className={labelClass}>What do you need? <span className="font-normal text-[var(--muted)]">(select any)</span></legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {projectTypes.map((type) => (
            <label key={type} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-[#1b3b2f]/20 bg-white px-4 py-3 text-sm leading-snug text-[var(--foreground)] transition-colors hover:border-[#896333] has-[:checked]:border-[#896333] has-[:checked]:bg-[#f3ead9]">
              <input type="checkbox" name="services" value={type} className="h-4 w-4 shrink-0 accent-[#896333]" />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={labelClass}>
        Project brief *
        <span className="mt-1 block text-sm font-normal leading-relaxed text-[var(--muted)]">Tell us about the product, audience, channels, and what you want to deliver.</span>
        <textarea className={`${inputClass} min-h-40 resize-y`} name="message" rows={6} maxLength={5000} required disabled={sending} placeholder="What are you looking to create?" />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={labelClass}>
          Target date <span className="font-normal text-[var(--muted)]">(optional)</span>
          <input className={inputClass} type="text" name="targetDate" maxLength={120} disabled={sending} placeholder="Launch date or flexible" />
        </label>
        <label className={labelClass}>
          Reference link <span className="font-normal text-[var(--muted)]">(optional)</span>
          <input className={inputClass} type="text" name="referenceLink" inputMode="url" maxLength={1000} disabled={sending} placeholder="Website, brief, or visual examples" />
        </label>
      </div>

      {status === "error" && (
        <div role="alert" className="rounded-md border border-red-600/30 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800">
          {errorMsg ? `${errorMsg} You can also email us at` : "We couldn’t send your brief. Please try again or email us at"}{" "}
          <a href={`mailto:${contact.email}`} className="font-semibold underline">{contact.email}</a>.
        </div>
      )}

      <div className="space-y-3">
        <button type="submit" disabled={sending} className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-7 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? "Sending…" : "Send Project Brief"}
          {!sending && <span className="ml-3" aria-hidden="true">↗</span>}
        </button>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Read our{" "}
          <Link href="/privacy-policy" target="_blank" rel="noopener" className="font-medium text-[var(--foreground)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
            Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
          </Link>{" "}
          to learn how we handle your inquiry.
        </p>
      </div>
    </form>
  );
}
