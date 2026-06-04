import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";

export const metadata: Metadata = {
  title: "How We Quote — FlarePix",
  description:
    "FlarePix quotes each project individually. No fixed packages — we tailor pricing based on your product type, volume, and use case. Get a proposal within 24 hours.",
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

const factors = [
  {
    title: "Product type and category",
    desc: "A kitchen scale has different visual requirements than a child&apos;s toy or a fashion dress. Complexity and setup requirements affect the quote.",
  },
  {
    title: "Volume and frequency",
    desc: "A single product shoot is priced differently than a catalog of 50 SKUs. Ongoing relationships get preferential rates.",
  },
  {
    title: "Content type and output format",
    desc: "Studio photography, AI imagery, product video, and brand film production involve different production costs.",
  },
  {
    title: "Delivery timeline",
    desc: "Standard turnaround is 6–8 business days. Rush delivery in 3–4 days is available at a premium.",
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
          How we quote
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Every project is different. We don&apos;t have fixed packages because your product,
          volume, and goals are specific to you. Send us your brief and we&apos;ll put together
          a tailored proposal — typically within 24 hours.
        </p>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          No hidden fees. No surprise line items. The quote you receive is what you pay.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {factors.map((f) => (
            <div key={f.title} className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
              <h2 className="text-base font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: f.desc }} />
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-8 text-center">
          <h2 className="text-xl font-semibold">Ready for a quote?</h2>
          <p className="mt-2 text-[var(--muted)]">
            Tell us about your product and what you&apos;re trying to achieve. We&apos;ll send a tailored
            proposal within 24 hours.
          </p>
          <div className="mt-6">
            <CtaButton href="/contact">Get a proposal</CtaButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
