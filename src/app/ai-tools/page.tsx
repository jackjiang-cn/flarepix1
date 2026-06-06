import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";

export const metadata: Metadata = {
  title: "AI Production Tools — How FlarePix Uses AI in Our Studio | FlarePix",
  description:
    "FlarePix uses AI as a production tool — not a self-serve platform. Learn how we integrate AI generation into our photography and video workflow for ecommerce brands.",
  alternates: {
    canonical: "https://flarepix.com/ai-tools",
  },
  openGraph: {
    title: "AI Production Tools — FlarePix",
    description:
      "FlarePix uses AI as a production tool — not a self-serve platform. Learn how we integrate AI generation into our studio workflow.",
    url: "https://flarepix.com/ai-tools",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AI Production Tools at FlarePix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Production Tools — FlarePix",
    description:
      "AI generation at FlarePix is a production capability — not a self-serve platform.",
    images: ["/og-image.jpg"],
  },
};

const tools = [
  {
    title: "AI On-Model Generator",
    description:
      "Upload a ghost mannequin or flat lay photo to get realistic on-model shots with diverse AI models. Perfect for fashion and apparel brands.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "AI Lifestyle Scene Creator",
    description:
      "Place your product into AI-generated lifestyle environments — beach, studio, urban, nature. One product photo, endless scenes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "AI Campaign Visuals",
    description:
      "Generate editorial-quality campaign images with AI models in real-looking locations. Built from your actual product for accuracy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    title: "AI Video Generator",
    description:
      "Turn product images into short-form video clips with AI motion and scene generation. Ready for TikTok, Reels, and Amazon.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="7" width="20" height="15" rx="2" />
        <polygon points="10,12 15,14 10,16" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function AiToolsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Production Tools
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
          AI generation at FlarePix is a production capability — not a self-serve platform. You don&apos;t
          sign up or operate the tools yourself. You send us your product, and our team integrates AI
          generation into the production workflow as part of our end-to-end service.
        </p>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Every output is reviewed by a team member before delivery. This means you receive finished
          files — not a draft to experiment with.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {tools.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-8"
            >
              <div className="text-[var(--amber)]">{t.icon}</div>
              <h2 className="mt-4 text-xl font-semibold">{t.title}</h2>
              <p className="mt-3 text-sm text-[var(--muted)]">
                {t.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-black/[0.10] bg-[var(--surface)] p-8 text-center">
          <p className="text-sm text-[var(--muted)]">
            To discuss how AI generation fits your project,{" "}
            <a href="/contact" className="text-[var(--amber)] hover:underline">
              get in touch
            </a>{" "}
            — we&apos;ll walk you through how we&apos;d approach your specific product and use case.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
