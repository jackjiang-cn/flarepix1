import Link from "next/link";
import { featuredFaqs } from "@/config/faqs";

export default function FaqSection() {
  return (
    <section className="border-t border-[#1b3b2f]/15 bg-[var(--surface)]" aria-labelledby="home-faq-title">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Frequently Asked Questions</p>
          <h2 id="home-faq-title" className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            A few things worth knowing.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            From planning a shoot to working remotely, find the answers that help you get started.
          </p>
          <Link href="/faq" className="mt-7 inline-flex min-h-10 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
            View All FAQs <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="border-t border-[#1b3b2f]/20">
          {featuredFaqs.map((faq) => (
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
  );
}
