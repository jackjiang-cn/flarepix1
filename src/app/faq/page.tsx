import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { faqGroups } from "@/config/faqs";

const description =
  "Answers about working with FlarePix: project pricing, samples, production, delivery, AI video, and product photography.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | FlarePix",
  description,
  alternates: { canonical: "https://www.flarepix.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | FlarePix",
    description,
    url: "https://www.flarepix.com/faq",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | FlarePix",
    description,
    images: ["/og-image.jpg"],
  },
};


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.questions.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  ),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28" aria-labelledby="faq-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / FAQ</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
            <div>
              <h1 id="faq-title" className="max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
                Answers before we begin<span className="text-[#b8975c]">.</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                A practical guide to planning, producing, and delivering work with FlarePix. Start here, then tell us about your brief.
              </p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
            </div>
            <nav aria-labelledby="faq-topics-title" className="rounded-xl bg-[#17382d] px-5 py-5 text-[#f4f2ec] sm:px-7 sm:py-7">
              <p id="faq-topics-title" className="font-semibold text-[#e3c48a]">Jump to a topic</p>
              <ul className="mt-4">
                {faqGroups.map((group) => (
                  <li key={group.id} className="border-t border-[#f4f2ec]/20">
                    <a
                      href={`#${group.id}`}
                      className="group flex min-h-12 items-center justify-between gap-4 py-3 text-sm font-semibold transition-colors hover:text-[#e3c48a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c48a] sm:text-base"
                    >
                      {group.title}
                      <span aria-hidden="true" className="shrink-0 text-[#e3c48a] motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5">↓</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {faqGroups.map((group, index) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className={`scroll-mt-24 border-t border-[#1b3b2f]/15 py-16 sm:py-20 ${index % 2 === 0 ? "bg-[var(--surface)]" : ""}`}>
            <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">{group.number} / FAQ</p>
                <h2 id={`${group.id}-title`} className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">{group.title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">{group.intro}</p>
              </div>
              <div className="border-t border-[#1b3b2f]/20">
                {group.questions.map((faq) => (
                  <details key={faq.q} className="group border-b border-[#1b3b2f]/20">
                    <summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-semibold leading-snug tracking-[-0.025em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] [&::-webkit-details-marker]:hidden">
                      <span>{faq.q}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1b3b2f]/25 text-xl font-normal text-[#896333] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-[var(--muted)] sm:text-base">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-[#17382d] text-[#f4f2ec]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cfb077]">Your Project</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Have a question about your brief?</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#d5ddd5] sm:text-base">Tell us what you want to create and where it will be used. We’ll help define the right scope.</p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Start a Project <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
