import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";

export const metadata: Metadata = {
  title: "Pricing — FlarePix",
  description:
    "Transparent pricing for product photography, video, and AI visuals. Volume discounts available.",
  alternates: {
    canonical: "https://flarepix.com/pricing",
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FlarePix Pricing",
  url: "https://flarepix.com/pricing",
  description: "Transparent pricing for product photography, video, and AI visuals",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "Offer", name: "Product Photography", price: "25", priceCurrency: "USD", description: "Per photo, from" },
      { "@type": "Offer", name: "Product Video", price: "150", priceCurrency: "USD", description: "Per video, from" },
      { "@type": "Offer", name: "AI Imagery", price: "30", priceCurrency: "USD", description: "Per image, from" },
      { "@type": "Offer", name: "AI Video", price: "100", priceCurrency: "USD", description: "Per video, from" },
    ],
  },
};

const plans = [
  {
    title: "Product Photography",
    price: "From $25",
    unit: "/ photo",
    items: [
      "White background or lifestyle",
      "Basic retouching included",
      "6–8 business day turnaround",
      "Rush delivery available",
      "Volume discounts from 50+ photos",
    ],
  },
  {
    title: "Product Video",
    price: "From $150",
    unit: "/ video",
    items: [
      "15–30 second product video",
      "Music & sound design",
      "Amazon & social optimized",
      "Multiple formats delivered",
      "Bundle discount with photo",
    ],
  },
  {
    title: "AI Imagery",
    price: "From $30",
    unit: "/ image",
    items: [
      "AI on-model generation",
      "Lifestyle scene placement",
      "Campaign visual creation",
      "Based on real product photo",
      "Bulk pricing available",
    ],
  },
  {
    title: "AI Video",
    price: "From $100",
    unit: "/ video",
    items: [
      "AI-generated product clips",
      "Scene & motion generation",
      "Social-ready formats",
      "Quick turnaround",
      "Volume discounts available",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
        />
        <h1 className="text-3xl font-semibold tracking-tight">
          Transparent pricing
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          No hidden fees. Volume discounts available for larger orders.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-6"
            >
              <h2 className="text-sm font-medium text-[var(--muted)]">
                {p.title}
              </h2>
              <p className="mt-2 text-3xl font-semibold">{p.price}</p>
              <p className="text-sm text-[var(--muted)]">{p.unit}</p>
              <ul className="mt-6 space-y-2">
                {p.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[var(--muted)]"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-[var(--amber)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--amber)]/20 bg-[var(--surface)] p-8 text-center">
          <h2 className="text-xl font-semibold">Large volume order?</h2>
          <p className="mt-2 text-[var(--muted)]">
            500+ photos or 50+ videos — contact us for custom pricing and
            dedicated production support.
          </p>
          <div className="mt-6">
            <CtaButton href="/contact">Request a quote</CtaButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
