"use client";

import { useState } from "react";

const items = [
  {
    question: "Quality that matches your brand",
    answer:
      "We work directly from your image references — lighting, angles, styling, and overall direction — and provide a test shot to lock in the look before full production begins. Every category follows a controlled setup to maintain accuracy, consistency, and brand-specific visual standards across all your images.",
  },
  {
    question: "Consistent at scale",
    answer:
      "Every brand receives its own lighting recipes, art direction, and category-specific setups to ensure the same look season after season. With locked-down lighting, uniform retouching, and color accuracy, imagery stays consistent across thousands of SKUs.",
  },
  {
    question: "Specialists in ecommerce workflows",
    answer:
      "FlarePix is specialized in ecommerce product workflows — white-background product shots, ghost mannequin, flat lay, on-model, lifestyle, and AI-generated imagery. Ideal for brands selling on Amazon, Shopify, and other platforms, handling both small catalogs and high-volume SKU counts with consistent quality.",
  },
  {
    question: "Volume discounts & loyalty programs",
    answer:
      "FlarePix offers volume discounts, subscription options, and loyalty programs designed for brands that partner with us long term. This structure reduces ongoing production costs while keeping visual quality consistent across seasons and collections.",
  },
  {
    question: "Easy process",
    answer:
      "Ship your products to our studio, share your brief and image specs, and receive upload-ready files — named and cropped to your guidelines. Prefer no shipping? Our AI generation pipeline creates lifestyle and on-model visuals directly from your product photos, with turnaround measured in days, not weeks.",
  },
  {
    question: "All-in-one ecommerce photo studio",
    answer:
      "Ghost mannequin, flat lay, on-model, AI on-model/lifestyle, 360/3D, and short product videos — all produced by one team under one streamlined workflow. This keeps your imagery consistent, efficient, and aligned across every product category and content format.",
  },
];

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-40">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Left — image, height matches right content */}
        <div
          className="overflow-hidden rounded-2xl bg-[var(--surface)]"
          style={{ minHeight: openIndex !== null ? `${400 + openIndex * 50}px` : "400px" }}
        >
          <img
            src="/works/photo/mens/mens_9.jpg"
            alt="FlarePix studio workflow"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right — accordion */}
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Why choose us
          </h2>
          <p className="mt-3 text-[var(--muted)]">
            Everything your product needs to sell — one studio, one brief, one
            box to ship.
          </p>

          <div className="mt-10">
            {items.map((item, i) => (
              <div key={item.question} className="border-b border-white/[0.06]">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="font-medium">{item.question}</span>
                  <span className="ml-4 shrink-0 text-[var(--amber)] text-lg leading-none">
                    {openIndex === i ? "−" : "+"}
                  </span>
                </button>
                {openIndex === i && (
                  <p className="pb-4 text-sm leading-relaxed text-[var(--muted)]">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
