import CtaButton from "./cta-button";
import { cdnUrl } from "@/config/cdn";

const features = [
  {
    title: "Top Quality",
    description: "Color, detail, and consistency throughout the set.",
  },
  {
    title: "Fast & Easy",
    description: "Send products; we deliver upload-ready photos.",
  },
  {
    title: "All-in-One",
    description: "Photo, video, 3D, AI — all in one ecommerce photography studio.",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-6 sm:py-28">
        <div className="grid gap-4 sm:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col justify-center rounded-xl border border-[var(--amber)]/20 bg-[var(--amber)]/5 px-8 py-10"
            >
              <h3 className="text-xl font-semibold text-[var(--amber)]">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{f.description}</p>
            </div>
          ))}
          {/* CTA card with background image */}
          <div
            className="relative min-h-[200px] overflow-hidden rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url('${cdnUrl("/works/photo/kids/kids_1.jpg")}')` }}
          >
            <div className="absolute bottom-4 left-4">
              <p className="mb-3 text-lg font-semibold text-white">Ready to start?</p>
              <CtaButton href="/contact">Book a shoot</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}