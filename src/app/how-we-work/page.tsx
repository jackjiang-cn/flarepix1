import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";

export const metadata: Metadata = {
  title: "How We Work | FlarePix",
  description:
    "Learn how FlarePix plans, produces, reviews, and delivers video and visual content with brands working remotely.",
  alternates: { canonical: "https://www.flarepix.com/how-we-work" },
  openGraph: {
    title: "How We Work | FlarePix",
    description: "A clear process for briefs, product samples, production, review, and delivery.",
    url: "https://www.flarepix.com/how-we-work",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "How FlarePix works" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How We Work | FlarePix",
    description: "From brief and sample planning to production, review, and delivery.",
    images: ["/og-image.jpg"],
  },
};

const steps = [
  {
    number: "01",
    title: "Share the brief",
    description: "Tell us about the product, audience, channels, visual references, and what the content needs to achieve.",
  },
  {
    number: "02",
    title: "Agree on the plan",
    description: "We agree the creative approach, production scope, deliverables, schedule, and review points before work begins.",
  },
  {
    number: "03",
    title: "Provide samples or assets",
    description: "Physical shoots start with agreed product samples and accessories. Reference-led work starts with approved product images and brand material.",
  },
  {
    number: "04",
    title: "Produce and review",
    description: "We create the planned content and share material for feedback at the review stage agreed for the project.",
  },
  {
    number: "05",
    title: "Finalize and deliver",
    description: "We address feedback within the agreed scope, complete final checks, and deliver files in the agreed formats.",
  },
] as const;

const qualityChecks = [
  {
    number: "01",
    title: "Product accuracy",
    description: "Compare visible product details, colours, branding, and demonstrated functions with the supplied references and brief.",
  },
  {
    number: "02",
    title: "Creative fit",
    description: "Check that the visuals and message follow the agreed direction and brand material.",
  },
  {
    number: "03",
    title: "Delivery readiness",
    description: "Check the final files against the formats, dimensions, and other technical details agreed for the project.",
  },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flarepix.com" },
    { "@type": "ListItem", position: 2, name: "How We Work", item: "https://www.flarepix.com/how-we-work" },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / How We Work</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div>
              <h1 className="max-w-3xl text-[clamp(2.75rem,5vw,4.75rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
                A clear path from brief to delivery.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                We plan, produce, review, and deliver video and visual content with clients working remotely. Scope, sample needs, review points, and final formats are agreed before production begins.
              </p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)] sm:w-auto">
                Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
            </div>
            <div>
              <ServiceVideoPreview
                title="finished brand film"
                src="/works/brand-film/brand-film-05.m4v"
                poster="/works/posters/brand-film-05.jpg"
              />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">
                Example of finished work
              </p>
            </div>
          </div>
          <nav aria-label="On this page" className="mt-14 grid border-t border-[#1b3b2f]/20 sm:grid-cols-3">
            {[
              { number: "01", label: "The Process", href: "#process" },
              { number: "02", label: "Working Remotely", href: "#working-remotely" },
              { number: "03", label: "Quality Checks", href: "#quality-checks" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group flex min-h-16 items-center justify-between gap-3 border-b border-[#1b3b2f]/20 py-4 text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                <span><span className="mr-3 text-xs text-[#896333]">{item.number}</span>{item.label}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-1">↓</span>
              </Link>
            ))}
          </nav>
        </section>

        <section id="process" className="scroll-mt-24 border-t border-[#1b3b2f]/15 bg-[var(--surface)] py-16 sm:py-20" aria-labelledby="process-title">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">01 / The Process</p>
                <h2 id="process-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Five clear checkpoints.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">The creative route may vary; the decisions stay visible from the start.</p>
            </div>
            <ol className="mt-10 border-t border-[#1b3b2f]/20">
              {steps.map((step) => (
                <li key={step.number} className="grid gap-3 border-b border-[#1b3b2f]/20 py-7 sm:grid-cols-[3rem_minmax(12rem,0.65fr)_minmax(0,1fr)] sm:gap-8 sm:py-9">
                  <span className="pt-1 text-xs font-semibold tracking-[0.16em] text-[#896333]">{step.number}</span>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{step.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="working-remotely" className="scroll-mt-24 border-t border-[#1b3b2f]/15 py-16 sm:py-20" aria-labelledby="remote-title">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">02 / Working Remotely</p>
                <h2 id="remote-title" className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Plan the handoffs before production.</h2>
              </div>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:pt-6">
                Remote production works best when everyone knows what to send, what will be reviewed, and who gives the final approval. We agree those details together in the project plan.
              </p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-[#1b3b2f]/15 bg-[#1b3b2f]/15 md:grid-cols-2">
              <article className="bg-[var(--background)] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">Physical Production</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">Product samples</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  Before shipping, we confirm the product list, variants, accessories, handling notes, receiving details, and what should happen to the samples after production.
                </p>
                <div className="mt-7 border-t border-[#1b3b2f]/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Confirm together</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">What to send · Where to send it · How receipt and return are handled</p>
                </div>
              </article>
              <article className="bg-[var(--background)] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">Reference-led Production</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">Product and brand assets</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                  For AI video projects, we agree which product photos, details, and brand references will guide production, including anything that must remain visually accurate.
                </p>
                <div className="mt-7 border-t border-[#1b3b2f]/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Confirm together</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Approved references · Product details · Brand direction</p>
                </div>
              </article>
            </div>
            <div className="mt-8 flex flex-col gap-3 border-l-2 border-[var(--amber)] pl-5 sm:flex-row sm:items-start sm:gap-10">
              <h3 className="shrink-0 text-sm font-semibold">Feedback and approval</h3>
              <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
                We agree who will consolidate feedback, when work is reviewed, and which revisions are included in the project scope.
              </p>
            </div>
          </div>
        </section>

        <section id="quality-checks" className="scroll-mt-24 bg-[#17382d] py-16 text-[#f4f2ec] sm:py-20" aria-labelledby="quality-title">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cfb077]">03 / Quality Checks</p>
            <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end lg:gap-16">
              <h2 id="quality-title" className="max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Check the details before delivery.</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-[#d5ddd5] sm:text-base">Final review follows the approved brief and the file requirements agreed for the project.</p>
            </div>
            <div className="mt-10 grid gap-6 border-t border-white/25 pt-8 md:grid-cols-3">
              {qualityChecks.map((check) => (
                <article key={check.number} className="border-l border-[#cfb077]/70 pl-5">
                  <p className="text-xs font-semibold tracking-[0.16em] text-[#cfb077]">{check.number}</p>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">{check.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#d5ddd5]">{check.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Start a Project</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Tell us what you need to create.</h2>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
              Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
