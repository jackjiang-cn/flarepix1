import Link from "next/link";

const services = [
  {
    title: "Commercials & Brand Films",
    description: "Films for campaigns, launches, and brand storytelling.",
    href: "/services/brand-film",
  },
  {
    title: "Advertising Creatives",
    description: "Short-form video assets for paid ads and social campaigns.",
    href: "/services#advertising-creatives",
  },
  {
    title: "Product Videos & Demonstrations",
    description: "Show how a product looks, works, and fits into real life.",
    href: "/services#product-demonstrations",
  },
  {
    title: "Product Photography",
    description: "Studio and lifestyle imagery for ecommerce and campaigns.",
    href: "/services#product-photography",
  },
] as const;

export default function ServicesOverview() {
  return (
    <section id="services-overview" className="scroll-mt-20 bg-[var(--surface)] py-20 sm:py-28" aria-labelledby="services-overview-title">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          id="services-overview-title"
          className="text-4xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-5xl"
        >
          What We Create
        </h2>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[#1b3b2f]/15 bg-[#1b3b2f]/15 sm:mt-12 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="bg-[var(--background)] p-7 transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--foreground)] sm:p-9"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--foreground)] sm:text-[1.75rem]">
                  {service.title}
                </h3>
                <span className="shrink-0 text-lg text-[#896333]" aria-hidden="true">↗</span>
              </div>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {service.description}
              </p>
            </Link>
          ))}
          <Link
            href="/services/ai-video"
            className="flex items-start justify-between gap-4 bg-[#e8ece3] px-7 py-6 transition-colors hover:bg-[#dde5da] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--foreground)] sm:px-9 md:col-span-2"
          >
            <div className="flex flex-col gap-x-6 gap-y-1 md:flex-row md:items-baseline">
              <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--foreground)]">
                AI Video Production
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Examples, production options, and pricing.
              </p>
            </div>
            <span className="shrink-0 text-lg text-[#896333]" aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="mt-9">
          <Link
            href="/services"
            className="inline-flex min-h-11 items-center gap-3 border-b border-[var(--foreground)] pb-1 text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
          >
            Explore Services <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
