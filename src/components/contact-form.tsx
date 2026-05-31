"use client";

import { useState, type FormEvent } from "react";
import CtaButton from "./cta-button";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--amber)]/20 bg-[var(--surface)] p-12 text-center">
        <p className="text-xl font-semibold">Thank you!</p>
        <p className="mt-2 text-[var(--muted)]">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-[var(--muted)]">Name</span>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm text-[var(--muted)]">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-sm text-[var(--muted)]">Service needed</span>
        <select
          name="service"
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-[var(--surface)] px-4 py-2.5 text-sm text-white focus:border-[var(--amber)] focus:outline-none"
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
          className="mt-1 block w-full rounded-lg border border-white/[0.08] bg-[var(--surface)] px-4 py-2.5 text-sm text-white placeholder:text-[var(--muted)] focus:border-[var(--amber)] focus:outline-none"
          placeholder="Tell us about your products, quantity, timeline..."
        />
      </label>
      <button type="submit">
        <CtaButton href="#">Send message</CtaButton>
      </button>
    </form>
  );
}
