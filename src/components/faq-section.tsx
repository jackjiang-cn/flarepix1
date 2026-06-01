"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does your product photography work?",
    a: "Ship your products to our studio, share your brief and specs, and we'll handle everything — styling, shooting, editing, and delivery. For AI generation, just upload a reference photo and we'll create lifestyle scenes, on-model shots, and more.",
  },
  {
    q: "What is your turnaround time?",
    a: "Standard turnaround is 6–8 business days from receipt of products and payment. Rush delivery in 3–4 business days available. AI generation can be even faster depending on volume.",
  },
  {
    q: "What services do you offer?",
    a: "We offer product photography (ghost mannequin, flat lay, on-model), product videography, AI on-model imagery, AI lifestyle scenes, AI video generation, and 3D product rendering. All from one studio, one workflow.",
  },
  {
    q: "Can I work with you remotely?",
    a: "Yes. Our process is fully remote — ship your products to us from anywhere, or use our AI generation service with just reference photos. You receive upload-ready files online.",
  },
  {
    q: "Is retouching included?",
    a: "Basic retouching is included on all images — color correction, cropping, and background cleanup. Premium retouching is available for advanced edits.",
  },
  {
    q: "What's the difference between AI generation and traditional photography?",
    a: "Traditional photography captures your actual product in our studio under controlled lighting. AI generation takes a reference photo and creates lifestyle scenes, on-model shots, and campaign visuals around it. Many brands use both for different needs.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:py-40">
        <h2 className="text-2xl font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-10">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border-b border-black/[0.08]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="pr-4 font-medium">{faq.q}</span>
                <span className="text-[var(--amber)]">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <p className="pb-4 text-sm text-[var(--muted)]">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
