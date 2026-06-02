"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(body.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[var(--amber)]/20 bg-[var(--surface)] p-12 text-center">
        <p className="text-xl font-semibold">Thank you!</p>
        <p className="mt-2 text-[var(--muted)]">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-[var(--muted)]">Name</span>
          <input
            type="text"
            name="name"
            disabled={sending}
            className="mt-1 block w-full rounded-lg border border-black/[0.10] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none disabled:opacity-50"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--muted)]">Email</span>
          <input
            type="email"
            name="email"
            required
            disabled={sending}
            className="mt-1 block w-full rounded-lg border border-black/[0.10] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none disabled:opacity-50"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Service needed</span>
        <select
          name="service"
          disabled={sending}
          className="mt-1 block w-full rounded-lg border border-black/[0.10] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--amber)] focus:outline-none disabled:opacity-50"
        >
          <option>Product photography</option>
          <option>Product video</option>
          <option>AI imagery</option>
          <option>AI video</option>
          <option>Multiple services</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Project details</span>
        <textarea
          name="message"
          required
          rows={5}
          disabled={sending}
          className="mt-1 block w-full rounded-lg border border-black/[0.10] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none disabled:opacity-50"
          placeholder="Tell us about your products, quantity, timeline..."
        />
      </label>

      {status === "error" && errorMsg && (
        <div className="rounded-lg border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-[#a37e4a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
