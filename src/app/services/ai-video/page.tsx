import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";
import ServiceFaq from "@/components/service-faq";
import { premiumAiVideo } from "@/config/ai-video-pricing";
import { aiVideoPricingFaq } from "@/config/faqs";
import { aiWorkVideos } from "@/config/work-videos";

export const metadata: Metadata = {
  title: "AI Video Production for Consumer Brands | FlarePix",
  description:
    "FlarePix creates AI-assisted scenes and advertising variations from approved product references, with human direction and review for product accuracy and brand fit.",
  alternates: { canonical: "https://www.flarepix.com/services/ai-video" },
  openGraph: {
    title: "AI Video Production for Consumer Brands | FlarePix",
    description:
      "FlarePix creates AI-assisted scenes and advertising variations from approved product references, with human direction and review for product accuracy and brand fit.",
    url: "https://www.flarepix.com/services/ai-video",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Production for Consumer Brands | FlarePix",
    description:
      "FlarePix creates AI-assisted scenes and advertising variations from approved product references, with human direction and review for product accuracy and brand fit.",
    images: ["/og-image.jpg"],
  },
};

const aiVideoFaqs = [
  aiVideoPricingFaq,
  {
    q: "What do you need from us?",
    a: "Share approved product images, specifications, brand references, intended channels, and the details that must remain accurate. We confirm the required assets before production.",
  },
  {
    q: "How do you check product accuracy?",
    a: "We review generated scenes against the product references you provide. When exact product details or functions need to be shown, we may recommend filming the real product.",
  },
  {
    q: "What formats will we receive?",
    a: "We agree on aspect ratios, resolution, file types, and any variations for your intended channels before production. The final deliverables are listed in your proposal.",
  },
  {
    q: "How long does AI video production take?",
    a: "Timing depends on the brief, source assets, scene complexity, and feedback schedule. We include production and review milestones in your proposal.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: aiVideoFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AiVideoPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services#ai-video"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          AI Video Production
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          AI-assisted scenes and ad variations for consumer brands. We work
          from approved product references and review each video for product
          accuracy, visual quality, and brand fit.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Discuss a Project</CtaButton>
        </div>

        {/* Video gallery */}
        <section id="ai-video-examples" className="mt-16 scroll-mt-24">
          <h2 className="text-xl font-semibold">AI video examples</h2>
          <GalleryLightbox
            items={aiWorkVideos.map((v) => ({ src: v.src, type: "video" as const, title: v.title, poster: v.poster }))}
            columns={2}
          />
        </section>

        <section id="ai-video-scope" className="mt-16 scroll-mt-24">
          <h2 className="text-xl font-semibold">AI video with a defined production scope.</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[var(--muted)]">
                We work from approved product images, specifications, and brand references to plan scenes for the intended channels. Our team generates, edits, and reviews the work against those references.
              </p>
              <p className="mt-4 text-[var(--muted)]">
                AI video can be useful for contextual scenes and ad variations. If a label, mechanism, or function must be shown exactly, we may recommend filming the real product.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Two ways to work</p>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Standard AI Video</strong> — $12 per finished second for a clear brief and straightforward scenes from supplied references.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Premium AI Video</strong> starts at {premiumAiVideo.startingPrice} for {premiumAiVideo.startingScope}. {premiumAiVideo.proposalNote}</span>
                </li>
              </ul>
              <Link href="/pricing#premium-ai-video" className="mt-5 inline-flex border-b border-[var(--foreground)] pb-1 text-sm font-semibold text-[var(--foreground)] hover:text-[var(--amber)]">
                See AI Video Pricing →
              </Link>
            </div>
          </div>
        </section>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services#product-photography"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Add still imagery</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              Product Photography →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Studio and lifestyle photographs for ecommerce and campaigns.
            </p>
          </Link>
          <Link
            href="/services/brand-film"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Explore filmed production</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              Commercials &amp; Brand Films →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Campaign films, launch videos, and brand stories shaped around your brief.
            </p>
          </Link>
        </section>

        <ServiceFaq faqs={aiVideoFaqs} />
      </main>
      <Footer />
    </>
  );
}
