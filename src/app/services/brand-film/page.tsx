import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";
import ServiceFaq from "@/components/service-faq";
import { brandFilmWorkVideos } from "@/config/work-videos";

export const metadata: Metadata = {
  title: "Commercial Video & Brand Film Production | FlarePix",
  description:
    "FlarePix produces commercials, launch films, and brand stories for consumer brands and ecommerce teams, from concept and filming to edit and delivery.",
  alternates: { canonical: "https://www.flarepix.com/services/brand-film" },
  openGraph: {
    title: "Commercial Video & Brand Film Production | FlarePix",
    description:
      "FlarePix produces commercials, launch films, and brand stories for consumer brands and ecommerce teams, from concept and filming to edit and delivery.",
    url: "https://www.flarepix.com/services/brand-film",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Video & Brand Film Production | FlarePix",
    description:
      "FlarePix produces commercials, launch films, and brand stories for consumer brands and ecommerce teams, from concept and filming to edit and delivery.",
    images: ["/og-image.jpg"],
  },
};

const brandFilmFaqs = [
  {
    q: "How is a brand film different from AI video?",
    a: "Brand films use planned filming when real footage is needed. AI video can create scenes from approved product references. We recommend an approach based on the brief and the level of product accuracy required.",
  },
  {
    q: "How long does a brand film take?",
    a: "Timing depends on the concept, shoot requirements, sample arrival, and feedback. We include production and review milestones in each proposal.",
  },
  {
    q: "What formats will I receive?",
    a: "We agree on aspect ratios, resolution, file types, and any cutdowns for your intended channels before production. The final deliverables are listed in your proposal.",
  },
  {
    q: "Can we work together if my brand is outside China?",
    a: "Yes. Our team is based in Qingdao and works with clients remotely. We agree on the samples or assets needed before production.",
  },
  {
    q: "What usage rights will I receive?",
    a: "The proposal states the intended use of the final film and any separate terms for music, talent, or other licensed assets.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: brandFilmFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function BrandFilmPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href="/services#brand-film"
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <p className="mt-6 text-sm font-medium text-[var(--amber)]">
          Commercial Video Production
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Commercials &amp; Brand Films
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          Films for campaigns, launches, and brand storytelling. We develop the
          concept, plan the shoot, and edit the final film for the channels and
          deliverables agreed in your brief.
        </p>

        <div className="mt-6 flex gap-4">
          <CtaButton href="/contact">Discuss a Project</CtaButton>
        </div>

        {/* Video showcase */}
        <section className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-xl font-semibold">Brand film examples</h2>
            <Link href="/work?videotype=film#browse-video-work" className="text-sm font-semibold underline underline-offset-4 hover:text-[#896333]">
              Browse brand films in Work
            </Link>
          </div>
          <GalleryLightbox
            items={brandFilmWorkVideos.map((film) => ({ src: film.src, type: "video" as const, title: film.title, poster: film.poster }))}
            columns={2}
          />
        </section>

        <section className="mt-16">
          <h2 className="text-xl font-semibold">A film shaped around your brief.</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[var(--muted)]">
                We begin with your audience, message, and intended channels. Before production, we agree on the concept, shoot plan, review stages, and final deliverables.
              </p>
              <p className="mt-4 text-[var(--muted)]">
                Depending on the project, we may use studio or location filming, talent, motion graphics, sound design, or AI-assisted techniques. The proposal sets out what is included.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Typical project elements</p>
              <ul className="mt-4 space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Concept and script</strong> — Creative direction based on your brief</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Production plan</strong> — Products, locations, talent, and shoot requirements agreed as needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Editing and review</strong> — Feedback points and revision rounds defined in the proposal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--amber)]" />
                  <span><strong>Final assets</strong> — Main film and any agreed cutdowns in the required formats</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cross-links to related services */}
        <section className="mt-16 grid gap-4 sm:grid-cols-2">
          <Link
            href="/services/ai-video"
            className="group rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 hover:border-[var(--amber)] transition-colors"
          >
            <p className="text-sm text-[var(--muted)]">Explore another approach</p>
            <p className="mt-1 font-semibold group-hover:text-[var(--amber)] transition-colors">
              AI Video →
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">
              AI-assisted scenes and ad variations created from approved product references.
            </p>
          </Link>
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
        </section>

        <ServiceFaq faqs={brandFilmFaqs} />
      </main>
      <Footer />
    </>
  );
}
