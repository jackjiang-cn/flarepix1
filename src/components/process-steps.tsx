import CtaButton from "./cta-button";

const steps = [
  {
    title: "Get a quote",
    description:
      "Tell us about your project and we'll give you a clear, upfront price. Discounts available for larger orders.",
  },
  {
    title: "Send your products",
    description:
      "Ship items to our studio — or upload reference photos for AI generation.",
  },
  {
    title: "We shoot & generate",
    description:
      "Real studio photography plus AI-enhanced scenes and models. Fast turnaround.",
  },
  {
    title: "Download & sell",
    description:
      "Your visuals are delivered polished and ready to use — no extra work needed.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-40 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          How does it work?
        </h2>
        <p className="mt-3 text-[var(--muted)]">We work remotely</p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title}>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--amber)]/30 text-lg font-semibold text-[var(--amber)]">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CtaButton href="/contact">Get a quote</CtaButton>
        </div>
      </div>
    </section>
  );
}
