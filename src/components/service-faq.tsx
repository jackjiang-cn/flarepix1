"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

export default function ServiceFaq({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold">Frequently asked questions</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-black/[0.08] bg-[var(--surface)]"
          >
            <button
              className="flex w-full items-center justify-between p-5 text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-sm font-medium">{faq.q}</span>
              <span className="ml-4 shrink-0 text-[var(--muted)]">
                {openIndex === i ? (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M3 8h10" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                )}
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-black/[0.06] p-5">
                <p className="text-sm text-[var(--muted)]">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
