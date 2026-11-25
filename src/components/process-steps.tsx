import Link from "next/link";
import CtaButton from "./cta-button";

const steps = [
  {
    title: "Share your brief",
    description:
      "Tell us about your product, audience, channels, and what you want the content to achieve.",
  },
  {
    title: "Agree on the plan",
    description:
      "We agree on the creative direction, production scope, deliverables, and schedule, and confirm any shipping details.",
  },
  {
    title: "Send samples or assets",
    description:
      "Once the plan is confirmed, ship the agreed product samples for your shoot or share approved reference assets for AI video.",
  },
  {
    title: "Produce and review",
    description:
      "We produce your content and share it for feedback at the agreed review stage.",
  },
  {
    title: "Finalize and deliver",
    description:
      "We make revisions within the agreed scope, run final checks, and deliver your files in the agreed formats.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="how-we-work" className="border-t border-[#1b3b2f]/10 bg-[var(--surface)] py-20 sm:py-28" aria-labelledby="how-we-work-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">
              How We Work
            </p>
            <h2 id="how-we-work-title" className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-5xl">
              From brief to final delivery.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              A clear production process for brands working with us remotely.
            </p>
          </div>
          <div className="grid gap-5 border-l-2 border-[var(--amber)] pl-5 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">Physical shoots</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Send product samples once the scope is agreed.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">AI video</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">Start with product references and creative direction.</p>
            </div>
          </div>
        </div>

        <ol className="mt-14 border-l border-[#1b3b2f]/25 pl-6 lg:grid lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pb-9 last:pb-0 lg:pb-0 lg:pt-8">
              <span className="absolute -left-[29px] top-1 h-2 w-2 rounded-full bg-[var(--amber)] lg:-top-[5px] lg:left-0" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.18em] text-[#896333]" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-6 lg:mt-12">
          <CtaButton href="/contact">Discuss a Project</CtaButton>
          <Link href="/how-we-work" className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
            See Full Process <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
