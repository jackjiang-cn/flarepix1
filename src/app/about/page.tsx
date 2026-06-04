import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";

export const metadata: Metadata = {
  title: "About — FlarePix | Professional Video Production Studio Using AI Tools",
  description:
    "FlarePix is a professional video production studio for Amazon and ecommerce brands. We use a hybrid approach: real footage combined with AI-assisted post-production — professional quality at a fraction of full-production cost.",
  alternates: {
    canonical: "https://flarepix.com/about",
  },
  openGraph: {
    title: "About FlarePix — Professional Video Production Studio",
    description:
      "Professional video production for Amazon sellers using a hybrid approach: real footage + AI post-production. Based in Qingdao, China.",
    url: "https://flarepix.com/about",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Professional Video Production Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FlarePix — Professional Video Production Studio",
    description:
      "Professional video production for Amazon sellers using a hybrid approach: real footage + AI post-production.",
    images: ["/og-image.jpg"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About FlarePix",
  description:
    "Professional video production studio for Amazon and ecommerce brands, using a hybrid approach: real footage combined with AI-assisted post-production.",
  url: "https://flarepix.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
    description: "AI-powered product photography and video services for ecommerce brands",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Qingdao",
      addressRegion: "Shandong",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@flarepix.com",
      contactType: "customer service",
    },
  },
};

const teamExpertise = [
  {
    label: "Amazon Product Video",
    desc: "Listing videos that convert — A+ content, hero shots, lifestyle context",
  },
  {
    label: "Brand Films",
    desc: "Cinematic brand stories for launches, trade shows, and paid social",
  },
  {
    label: "AI Video Generation",
    desc: "Scalable video content for Meta and TikTok campaigns — with professional QC",
  },
  {
    label: "AI Product Imagery",
    desc: "Lifestyle scenes and on-model shots generated with AI, reviewed by humans",
  },
];

const caseCategories = [
  { name: "Electronic scales", note: "kitchen and body weight scales for Amazon listing videos" },
  { name: "Children's toys", note: "kids toys and play sets for brand films and lifestyle photography" },
  { name: "Tissue products", note: "facial tissue, paper towels, and household tissue packaging photography" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="text-sm font-medium text-[var(--amber)]">About FlarePix</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Professional video production studio using AI tools — not an AI tool you&apos;re using yourself
          </h1>
          <p className="mt-5 text-lg text-[var(--muted)]">
            FlarePix is a professional production studio based in Qingdao, China — the world&apos;s
            manufacturing hub. We work with Amazon and ecommerce sellers in the US and Europe who
            source products from manufacturers in China. Our hybrid approach — real footage combined
            with AI-assisted post-production — delivers cinematic quality at a fraction of traditional
            production cost, with faster turnaround.
          </p>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Unlike AI-only tools or template studios, we manage the full production process: creative
            direction, real filming or AI generation, professional review, and delivery. Your product
            deserves visuals that actually represent your brand — not a generic output that looks like
            everyone else&apos;s.
          </p>
          <div className="mt-8 flex gap-4">
            <CtaButton href="/contact">Work with us</CtaButton>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--amber)] px-7 py-3 text-sm font-medium text-[var(--amber)] transition-colors hover:bg-[var(--amber)] hover:text-black"
            >
              View services
            </Link>
          </div>
        </section>

        {/* Why hybrid */}
        <section className="mt-20 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Why hybrid production?</h2>
            <p className="mt-3 text-[var(--muted)]">
              Full-production shoots (professional talent, studio rental, multi-day scheduling) deliver
              great results — but they&apos;re expensive and slow. AI-only tools are fast and affordable
              — but the output often looks generic and hurts your brand perception.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Hybrid production combines real footage (professional talent, real studio or location)
              with AI-assisted post-production (color grading, motion graphics, upscaling). The result:
              cinematic quality at a fraction of traditional cost, with turnaround times that actually
              fit your product launch schedule.
            </p>
            <p className="mt-3 text-[var(--muted)]">
              Based in Qingdao, we work with sellers worldwide who source from Chinese manufacturers.
              Your products are already here — your visuals should match the quality of your brand.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What we do</h2>
            <div className="mt-4 space-y-4">
              {teamExpertise.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-[var(--muted)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries / case categories */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold">Industries we work with</h2>
          <p className="mt-2 text-[var(--muted)]">
            We produce content across a wide range of product categories. Examples of recent projects:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {caseCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6"
              >
                <p className="font-medium">{cat.name}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{cat.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mt-20">
          <h2 className="text-xl font-semibold">How we work — from brief to delivery</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-5">
            {[
              {
                step: "1",
                title: "Brief",
                desc: "You send us your product and goals — listing type, target audience, intended use.",
              },
              {
                step: "2",
                title: "Quote",
                desc: "We review and send a tailored proposal — typically within 24 hours.",
              },
              {
                step: "3",
                title: "Production",
                desc: "Real filming or AI generation — with professional direction and equipment.",
              },
              {
                step: "4",
                title: "Review",
                desc: "Our team reviews every output for accuracy, brand fit, and Amazon compliance.",
              },
              {
                step: "5",
                title: "Delivery",
                desc: "Final files delivered in your required formats, ready for upload.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[var(--amber)] text-sm font-bold text-black">
                  {item.step}
                </div>
                <p className="mt-2 font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-20 grid gap-6 sm:grid-cols-4">
          {[
            { value: "4K", label: "Production quality" },
            { value: "2–5", label: "Business days turnaround" },
            { value: "∞", label: "Revisions included" },
            { value: "100%", label: "Brand ownership" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center"
            >
              <p className="text-3xl font-bold text-[var(--amber)]">{stat.value}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-20 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-12 text-center">
          <h2 className="text-xl font-semibold">Ready to work with a team that gets it right?</h2>
          <p className="mt-3 text-[var(--muted)]">
            Tell us about your product and we&apos;ll put together a tailored proposal.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <CtaButton href="/contact">Get a quote</CtaButton>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--amber)] px-7 py-3 text-sm font-medium text-[var(--amber)] transition-colors hover:bg-[var(--amber)] hover:text-black"
            >
              Explore services
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}