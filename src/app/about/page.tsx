import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";
import { brandFilm02Web, cdnUrl } from "@/config/cdn";

const description =
  "FlarePix is a Qingdao-based video and visual production studio for consumer brands and ecommerce teams, creating commercials, advertising creatives, product demonstrations, photography, and AI video.";

export const metadata: Metadata = {
  title: "About FlarePix | Video & Visual Production Studio",
  description,
  alternates: { canonical: "https://www.flarepix.com/about" },
  openGraph: {
    title: "About FlarePix | Video & Visual Production Studio",
    description,
    url: "https://www.flarepix.com/about",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "About FlarePix" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About FlarePix | Video & Visual Production Studio",
    description,
    images: ["/og-image.jpg"],
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About FlarePix",
  description,
  url: "https://www.flarepix.com/about",
  mainEntity: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://www.flarepix.com",
    description,
    email: "hello@flarepix.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Qingdao",
      addressRegion: "Shandong",
      addressCountry: "CN",
    },
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flarepix.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.flarepix.com/about" },
  ],
};

const responsibilities = [
  {
    title: "Creative direction",
    description: "We shape the visual approach around the brief, the audience, and where the content will appear.",
  },
  {
    title: "Production and editing",
    description: "We choose the production method that fits the project, then bring the footage and visuals together in the edit.",
  },
  {
    title: "Review and delivery",
    description: "We check the work against agreed product references, brand direction, and final file requirements.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutSchema, breadcrumbSchema]) }}
        />

        <section className="mx-auto max-w-7xl px-6 pb-14 pt-20 sm:pb-20 sm:pt-28" aria-labelledby="about-title">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">About FlarePix</p>
          <div className="mt-7 grid gap-9 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:items-end lg:gap-20">
            <h1 id="about-title" className="max-w-3xl text-[clamp(3rem,6.2vw,6rem)] font-semibold leading-[1.02] tracking-[-0.065em]">
              The studio behind the work<span className="text-[#b8975c]">.</span>
            </h1>
            <div className="lg:pb-2">
              <p className="max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                FlarePix is a video and visual production studio based in Qingdao, China. We create commercials, advertising creatives, product demonstrations, photography, and AI video for consumer brands and ecommerce teams.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/work" className="inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                  View Our Work <span className="ml-3" aria-hidden="true">↗</span>
                </Link>
                <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[var(--amber)] px-6 text-sm font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                  Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1b3b2f]/15 bg-[var(--surface)] py-10 sm:py-14" aria-labelledby="work-preview-title">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">01 / The Work</p>
                <h2 id="work-preview-title" className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">A glimpse of what we make.</h2>
              </div>
              <Link href="/work" className="inline-flex min-h-10 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
                Explore All Work <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ServiceVideoPreview
              title="Selected brand film"
              {...brandFilm02Web}
            />
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Selected work / Brand film preview</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28" aria-labelledby="production-title">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">02 / Production</p>
              <h2 id="production-title" className="mt-3 max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Different briefs call for different production.</h2>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:pt-7">
              We start with what the content needs to communicate. The production approach follows the idea, the product, and the channels where the work will be used.
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-[#1b3b2f]/15 bg-[#1b3b2f]/15 md:grid-cols-2">
            <article className="bg-[var(--surface)] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">01 / Filmed production</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Real products. Real movement.</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                Commercials, campaign films, demonstrations, and photography built around the product and the story the brand wants to tell.
              </p>
              <p className="mt-8 border-t border-[#1b3b2f]/15 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Video production · Photography</p>
            </article>
            <article className="bg-[var(--surface)] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#896333]">02 / AI video production</p>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Another way to create.</h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                AI-assisted scenes and variations developed from approved product and brand references, with creative direction and checks for visual accuracy.
              </p>
              <p className="mt-8 border-t border-[#1b3b2f]/15 pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Reference-led · Team reviewed</p>
            </article>
          </div>
          <Link href="/services" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
            Explore Our Services <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <section id="qingdao-studio" className="scroll-mt-20 border-t border-[#1b3b2f]/15 bg-[var(--surface)] py-20 sm:py-24" aria-labelledby="team-title">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-20">
              <div>
                <h2 id="team-title" className="max-w-md text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">How We Film in Qingdao</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
                  For the Arboleaf body composition scale, we set the camera at floor level to show the electrodes, display, and handle clearly. We filmed on a living-room set to show the scale in a familiar setting.
                </p>
                <Link href="/blog/arboleaf-product-video-case-study#produced" className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]">
                  Read the Arboleaf Case Study <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <figure>
                <div className="relative aspect-video overflow-hidden rounded-md bg-[#d8d6cc]">
                  <Image
                    src={cdnUrl("/works/Case screenshots/Arboleaf-Smart-Scale-compressed.jpg")}
                    alt="The Arboleaf scale beside a yoga mat on the living-room set"
                    fill
                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Frame from the finished Arboleaf product video</figcaption>
              </figure>
            </div>
            <ol className="mt-12 grid gap-7 border-t border-[#1b3b2f]/20 pt-8 md:grid-cols-3">
              {responsibilities.map((item) => (
                <li key={item.title} className="border-l border-[var(--amber)] pl-5">
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">{item.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#17382d] py-20 text-[#f4f2ec] sm:py-24" aria-labelledby="remote-title">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#cfb077]">04 / Working Together</p>
              <h2 id="remote-title" className="mt-3 max-w-xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Plan and review your project remotely.</h2>
            </div>
            <div>
              <p className="max-w-xl text-base leading-relaxed text-[#d5ddd5]">
                We agree on the scope, sample or reference needs, review points, and final formats before production begins. That gives both sides a clear plan for the work.
              </p>
              <Link href="/how-we-work" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[#cfb077] text-sm font-semibold text-[#f4f2ec] hover:text-[#cfb077] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                See How We Work <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[var(--background)] py-14 sm:py-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Start a Project</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Tell us what you need to create.</h2>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
              Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
