import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";
import { premiumAiVideo } from "@/config/ai-video-pricing";

const description =
  "Explore starting prices for FlarePix commercials, advertising creatives, product videos, AI video production, and product photography. Final quotes are tailored to your brief.";

export const metadata: Metadata = {
  title: "Pricing for Video & Visual Production | FlarePix",
  description,
  alternates: { canonical: "https://www.flarepix.com/pricing" },
  openGraph: {
    title: "Pricing for Video & Visual Production | FlarePix",
    description,
    url: "https://www.flarepix.com/pricing",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing for Video & Visual Production | FlarePix",
    description,
    images: ["/og-image.jpg"],
  },
};

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "FlarePix Pricing",
  url: "https://www.flarepix.com/pricing",
  description,
};

const filmedServices = [
  {
    title: "Commercials & Brand Films",
    price: "$3,300",
    description: "A focused brand or launch film, shaped around the story you want people to remember.",
    scope: ["Concept and script", "One shoot day", "Main film and agreed cutdowns"],
    note: "Multi-day campaigns start from $6,000 and are scoped individually.",
  },
  {
    title: "Advertising Creatives",
    price: "$1,500",
    description: "Short-form video content planned for paid campaigns and social channels.",
    scope: ["Focused shoot", "One 30–60 second ad", "Three vertical cutdowns"],
    note: "Additional concepts, hooks, and formats are priced to the brief.",
  },
  {
    title: "Product Videos & Demonstrations",
    price: "$720",
    description: "Show how a product works and make its most useful details easy to understand.",
    scope: ["One product", "Simple studio setup", "One edited demonstration"],
    note: "Models, locations, and more involved demonstrations are quoted separately.",
  },
] as const;

function QuoteLink() {
  return (
    <Link href="/contact" className="mt-auto inline-flex min-h-10 items-center gap-2 self-start border-b border-[var(--foreground)] pt-7 text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
      Discuss this project <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28" aria-labelledby="pricing-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Pricing</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
            <h1 id="pricing-title" className="max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
              Clear starting prices. A quote built around your brief<span className="text-[#b8975c]">.</span>
            </h1>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:pb-2">
              Use these starting budgets to plan your project. We confirm the deliverables, production needs, and final price with you before work begins.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#1b3b2f]/20 pt-5 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
            <span>All prices in USD</span><span>Starting budgets</span><span>Final quote by project</span>
          </div>
        </section>

        <section id="filmed-production" className="scroll-mt-24 bg-[#17382d] text-[#f4f2ec]" aria-labelledby="filmed-pricing-title">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="filmed-pricing-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Filmed production budgets</h2>
              <Link
                href="/services#video-production"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-[#cfb077] text-sm font-semibold text-[#e3c48a] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e3c48a]"
              >
                Watch video examples <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {filmedServices.map((service) => (
                <article key={service.title} className="flex h-full flex-col bg-[var(--background)] px-6 py-7 text-[var(--foreground)] sm:px-7">
                  <div className="lg:min-h-36 xl:min-h-32">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{service.description}</p>
                  </div>
                  <div className="mt-5 border-t border-[#1b3b2f]/20 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Starting from</p>
                    <p className="mt-1 text-4xl font-semibold tracking-[-0.055em]">{service.price}</p>
                  </div>
                  <div className="mt-5 border-t border-[#1b3b2f]/15 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Typical starting scope</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed marker:text-[#896333]">
                      {service.scope.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <p className="mt-4 text-xs leading-relaxed text-[var(--muted)]">{service.note}</p>
                  </div>
                  <QuoteLink />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20" aria-labelledby="more-pricing-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">02 / More Ways to Create</p>
          <h2 id="more-pricing-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">More options for your brief.</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col border border-[#1b3b2f]/15 bg-[#fbfaf6]">
              <ServiceVideoPreview title="AI Video Production" src="/works/ai/videos/ai-video-04.mp4" poster="/works/posters/ai-video-04.jpg" />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#896333]">04 / AI Video Production</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">AI Video Production</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">AI-assisted scenes and ads made from your product references, with team direction and review for product accuracy and brand fit.</p>
                <div className="mt-6 border-t border-[#1b3b2f]/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Standard AI Video</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.055em]">$12 <span className="text-lg font-medium tracking-normal text-[var(--muted)]">/ finished second</span></p>
                  <p className="mt-3 text-sm leading-relaxed">For a clear brief and straightforward scenes using supplied product references. One edited video, priced by its finished length.</p>
                  <p className="mt-3 text-xs font-medium text-[var(--muted)]">15 seconds: $180 <span aria-hidden="true">·</span> 30 seconds: $360</p>
                </div>
                <div id="premium-ai-video" className="mt-6 scroll-mt-24 border-t border-[#1b3b2f]/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Premium AI Video</p>
                  <p className="mt-2 text-4xl font-semibold tracking-[-0.055em]">{premiumAiVideo.startingPrice} <span className="text-lg font-medium tracking-normal text-[var(--muted)]">starting from</span></p>
                  <p className="mt-3 text-sm leading-relaxed">For {premiumAiVideo.startingScope}.</p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">{premiumAiVideo.proposalNote}</p>
                </div>
                <QuoteLink />
              </div>
            </article>
            <article className="flex flex-col border border-[#1b3b2f]/15 bg-[#fbfaf6]">
              <div className="relative aspect-video overflow-hidden bg-[#e8e5dc]">
                <Image src="/works/photo/_compressed_new/products/products_18.jpg" alt="Wine bottle photographed against a white studio background" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                <span className="absolute bottom-4 left-4 bg-[#17382d]/85 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Photography preview</span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#896333]">05 / Product Photography</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Product Photography</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--muted)]">Clean product images for ecommerce listings, with styling and lifestyle photography available for broader campaigns.</p>
                <div className="mt-6 border-t border-[#1b3b2f]/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Starting from</p>
                  <p className="mt-1 text-4xl font-semibold tracking-[-0.055em]">$10 <span className="text-lg font-medium tracking-normal text-[var(--muted)]">/ image</span></p>
                  <p className="mt-3 text-sm leading-relaxed">One finished white-background image of one product from one angle, with basic color correction. Lifestyle, model, and complex product shoots are quoted separately.</p>
                </div>
                <QuoteLink />
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-[#1b3b2f]/15 bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Before We Quote</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">The details that shape the price.</h2>
            </div>
            <div>
              <p className="text-base leading-relaxed text-[var(--muted)]">The starting prices above describe a focused scope. Your quote sets out the final deliverables, shoot needs, review rounds, and usage requirements. Talent, locations, props, complex setups, and sample shipping are priced when your project needs them.</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                Get a Project Quote <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
