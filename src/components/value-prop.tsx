import CtaButton from "./cta-button";

export default function ValueProp() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-40 text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Creative built for{" "}
        <span className="text-[var(--muted)]">campaigns and commerce.</span>
      </h2>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Commercial films, ad creatives, product demonstrations, and photography
        — planned for campaigns, social, and ecommerce.
      </p>
      <div className="mt-8">
        <CtaButton href="/contact">Discuss a Project</CtaButton>
      </div>
    </section>
  );
}
