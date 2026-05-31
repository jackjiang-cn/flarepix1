import CtaButton from "./cta-button";

export default function ValueProp() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-40 text-center">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Everything your product needs{" "}
        <span className="text-[var(--muted)]">to sell online</span>
      </h2>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Photo, video, AI imagery, AI video — one place, one workflow
      </p>
      <div className="mt-8">
        <CtaButton href="/contact">Start your project</CtaButton>
      </div>
    </section>
  );
}
