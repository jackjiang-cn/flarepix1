import Link from "next/link";

export default function TrustSignals() {
  return (
    <section
      className="bg-[#17382d] text-[#f4f2ec]"
      aria-labelledby="home-project-cta-title"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cfb077]">
            Start a Project
          </p>
          <h2
            id="home-project-cta-title"
            className="mt-6 max-w-3xl text-[clamp(2.75rem,5.2vw,5.25rem)] font-semibold leading-[1.06] tracking-[-0.055em]"
          >
            Bring us the brief. <span className="text-[#cfb077]">We&apos;ll plan the production.</span>
          </h2>
        </div>
        <div className="lg:pb-2">
          <p className="max-w-lg text-base leading-relaxed text-[#f4f2ec]/80 sm:text-lg">
            Tell us what you&apos;re launching, where the content will run, and what you need to show. We&apos;ll propose a production approach and agree on the deliverables together.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#cfb077] px-6 text-sm font-semibold text-[#17382d] transition-colors hover:bg-[#e0c895] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
          >
            Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
