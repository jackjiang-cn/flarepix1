"use client";

import { useState } from "react";
import Link from "next/link";

const items = [
  {
    question: "Show the details that matter",
    answer:
      "For the GE Smart Scale film, we shot at floor level to show the electrodes and used close-ups to show the handle display and phone app.",
  },
  {
    question: "Make the set fit the shot",
    answer:
      "In one wide shot of the GE Smart Scale film, we digitally extended the living-room background around studio footage of the scale.",
  },
  {
    question: "Review what your customers will see",
    answer:
      "Before delivery, we check visible product details against the approved samples or references and verify the files against the agreed requirements.",
  },
];

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="why-us" aria-labelledby="why-us-title" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <h2 id="why-us-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            Why Work With FlarePix
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">
            From our Qingdao studio, we work with brands remotely and plan each shoot around the product details and actions your audience needs to see.
          </p>
          <Link href="/about#qingdao-studio" className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
            How We Film in Qingdao <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="border-t border-[#1b3b2f]/15">
          {items.map((item, index) => {
            const expanded = openIndex === index;
            const panelId = `why-us-detail-${index}`;
            return (
              <div key={item.question} className="border-b border-[#1b3b2f]/15">
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(expanded ? null : index)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 py-4 text-left font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
                >
                  <span>{item.question}</span>
                  <span className="shrink-0 text-lg leading-none text-[#896333]" aria-hidden="true">
                    {expanded ? "−" : "+"}
                  </span>
                </button>
                <p id={panelId} hidden={!expanded} className="pb-4 text-sm leading-relaxed text-[var(--muted)]">
                  {item.answer}
                </p>
              </div>
            );
          })}
          <Link href="/blog/hybrid-production-behind-the-scenes#filmed" className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
            See the GE Filming Breakdown <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
