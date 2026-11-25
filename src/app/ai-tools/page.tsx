import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";

export const metadata: Metadata = {
  title: "AI-Assisted Video Production | FlarePix",
  description:
    "See how FlarePix creates AI-assisted scenes and advertising variations from approved product references, with team direction and review for product accuracy and brand fit.",
  alternates: {
    canonical: "https://www.flarepix.com/ai-tools",
  },
  openGraph: {
    title: "AI-Assisted Video Production | FlarePix",
    description:
      "AI-assisted scenes and ad variations for consumer brands, directed and reviewed by the FlarePix team.",
    url: "https://www.flarepix.com/ai-tools",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix AI video production" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Assisted Video Production | FlarePix",
    description:
      "AI-assisted scenes and ad variations for consumer brands, directed and reviewed by the FlarePix team.",
    images: ["/og-image.jpg"],
  },
};

export default function AiToolsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:items-center md:gap-14 md:py-28">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">
              FlarePix / AI in production
            </p>
            <h1 className="mt-6 max-w-2xl text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-[var(--foreground)]">
              AI video with a production team behind it.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              We create AI-assisted scenes and advertising variations from approved product references. Our team directs, edits, and reviews the work for product accuracy and brand fit.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/services/ai-video"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
              >
                Explore AI Video <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#1b3b2f]/40 px-6 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]"
              >
                Discuss a Project
              </Link>
            </div>
          </div>
          <ServiceVideoPreview
            title="AI video production"
            src="/works/ai/videos/ai-video-04.mp4"
            poster="/works/posters/ai-video-04.jpg"
          />
        </section>

        <section className="border-t border-[#1b3b2f]/15 bg-[var(--surface)]">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">
              Choosing the right approach
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-[var(--foreground)] sm:text-4xl">
              The method follows the brief.
            </h2>
            <div className="mt-10 grid gap-8 border-t border-[#1b3b2f]/20 pt-8 md:grid-cols-2 md:gap-14">
              <div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">AI-assisted scenes</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-[var(--muted)]">
                  AI video can help build contextual scenes and ad variations from the product references you provide. We agree on the concept, formats, and review points before production.
                </p>
                <Link href="/services/ai-video" className="mt-6 inline-flex min-h-9 items-center border-b border-[var(--foreground)] text-sm font-semibold text-[var(--foreground)] hover:text-[#896333]">
                  See AI Video Production <span className="ml-2" aria-hidden="true">↗</span>
                </Link>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[var(--foreground)]">Filmed production</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-[var(--muted)]">
                  When exact product details or functions need to be shown, filming the real product may be the better choice. We can plan commercials, demonstrations, and ad creatives around that need.
                </p>
                <Link href="/services" className="mt-6 inline-flex min-h-9 items-center border-b border-[var(--foreground)] text-sm font-semibold text-[var(--foreground)] hover:text-[#896333]">
                  Explore Our Services <span className="ml-2" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
