import CtaButton from "./cta-button";
import HeroShowreel from "./hero-showreel";

export default function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className="bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-9 px-6 pb-14 pt-12 sm:gap-12 sm:pb-20 sm:pt-18 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-24 xl:gap-16">
        <div>
          <p className="mb-5 text-sm font-medium text-[#77542d] sm:mb-6">
            Product Content Studio
          </p>
          <h1 id="home-hero-title" className="max-w-[12ch] text-[clamp(2.5rem,5.3vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.065em] text-foreground">
            Product videos <span className="text-[#896333]">&amp; photography</span>
          </h1>
          <p className="mt-6 max-w-[39ch] text-base leading-relaxed text-muted sm:text-lg">
            Commercials, product demos, and photography for consumer brands and ecommerce teams.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-8 sm:gap-x-7">
            <CtaButton href="/contact" className="min-h-12">Discuss a Project</CtaButton>
            <a href="#selected-work" className="inline-flex min-h-12 items-center text-sm font-semibold text-foreground underline decoration-foreground/35 underline-offset-6 transition-colors hover:text-[#77542d] focus-visible:outline-2 focus-visible:outline-offset-4">
              View Our Work
            </a>
          </div>
        </div>
        <HeroShowreel />
      </div>
    </section>
  );
}
