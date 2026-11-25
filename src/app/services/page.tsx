import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";
import { photoCategories, videoProductionCategories } from "@/config/categories";
import { brandFilm02Web, cdnUrl, posterFor } from "@/config/cdn";

export const metadata: Metadata = {
  title: "Video Production & Product Photography for Ecommerce | FlarePix",
  description:
    "Commercials, advertising creatives, product demonstrations, AI video production, and product photography for consumer and ecommerce brands.",
  alternates: { canonical: "https://www.flarepix.com/services" },
  openGraph: {
    title: "Video & Visual Production Services | FlarePix",
    description: "Commercials, ad creatives, product videos, AI video, and photography for consumer brands.",
    url: "https://www.flarepix.com/services",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Video & Visual Production Services | FlarePix",
    description: "Commercials, ad creatives, product videos, AI video, and photography for consumer brands.",
    images: ["/og-image.jpg"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FlarePix Video and Visual Production",
  description: "Commercials, advertising creatives, product demonstrations, AI video production, and product photography for consumer and ecommerce brands.",
  provider: { "@type": "Organization", name: "FlarePix", url: "https://www.flarepix.com" },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Video and Visual Production Services",
    itemListElement: [
      { "@type": "Offer", name: "Commercials & Brand Films" },
      { "@type": "Offer", name: "Advertising Creatives" },
      { "@type": "Offer", name: "Product Videos & Demonstrations" },
      { "@type": "Offer", name: "AI Video Production" },
      { "@type": "Offer", name: "Product Photography" },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flarepix.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.flarepix.com/services" },
  ],
};

const videoServices = [
  {
    number: "01", id: "brand-film", title: "Commercials & Brand Films",
    description: "Campaign films, launch videos, and brand stories shaped around the idea you want people to remember.",
    outputs: "Campaign films · Launch videos · Channel cutdowns",
    href: "/services/brand-film", linkLabel: "Explore brand film services",
    video: brandFilm02Web.src,
    poster: brandFilm02Web.poster,
  },
  {
    number: "02", id: "advertising-creatives", title: "Advertising Creatives",
    description: "Short-form video concepts and edits made for paid campaigns and social channels.",
    outputs: "Short video ads · Opening hooks · Format variations",
    href: "/work?videotype=advertising#browse-video-work", linkLabel: "View advertising creatives",
    video: "/works/video/Electronics/product-video-10.m4v",
  },
  {
    number: "03", id: "product-demonstrations", title: "Product Videos & Demonstrations",
    description: "Show how a product works, where it fits into everyday life, and the details that make it worth choosing.",
    outputs: "Feature demos · Use-case videos · Product films",
    href: "/work?videotype=demonstration#browse-video-work", linkLabel: "View product demonstrations",
    video: "/works/video/Home & Kitchen/product-video-02.mp4",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }} />

        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Services</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.75fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.06em] text-[var(--foreground)]">
              Video and visual production for consumer brands.
            </h1>
            <div className="lg:pb-2">
              <p className="max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                From commercials and advertising creatives to product demonstrations, AI video, and photography, we create content for the ways brands sell and communicate.
              </p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="video-production" className="scroll-mt-24 border-t border-[#1b3b2f]/15">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Video Production</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Production with a purpose.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[var(--muted)] sm:text-base">Choose the story and format around your campaign, product, and audience.</p>
            </div>
            <div className="mt-11 border-t border-[#1b3b2f]/20">
              {videoServices.map((service) => (
                <article id={service.id} key={service.id} className="grid scroll-mt-28 gap-5 border-b border-[#1b3b2f]/20 py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(17rem,0.8fr)] md:items-start md:gap-x-8 md:gap-y-4 md:py-11">
                  <span className="pt-1 text-xs font-semibold tracking-[0.16em] text-[#896333] md:col-start-1 md:row-start-1">{service.number}</span>
                  <h3 className="max-w-lg text-2xl font-semibold tracking-[-0.035em] sm:text-3xl md:col-start-2 md:row-start-1">{service.title}</h3>
                  <div className="md:col-start-3 md:row-start-1 md:row-span-2">
                    <ServiceVideoPreview title={service.title} src={service.video} poster={"poster" in service ? service.poster : posterFor(service.video)} />
                  </div>
                  <div className="md:col-start-2 md:row-start-2">
                    <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">{service.description}</p>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Typical outputs</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{service.outputs}</p>
                    <Link href={service.href} className="mt-5 inline-flex min-h-9 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                      {service.linkLabel} <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">Deliverables and formats are agreed for each project.</p>
          </div>
        </section>

        <section id="ai-video" className="scroll-mt-24 border-b border-[#1b3b2f]/15 bg-[var(--surface)]">
          <div className="mx-auto grid max-w-7xl gap-5 px-6 py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(17rem,0.8fr)] md:items-start md:gap-x-8 md:gap-y-4 md:py-11">
            <span className="pt-1 text-xs font-semibold tracking-[0.16em] text-[#896333] md:col-start-1 md:row-start-1">04</span>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl md:col-start-2 md:row-start-1">AI Video Production</h2>
            <div className="md:col-start-3 md:row-start-1 md:row-span-2">
              <ServiceVideoPreview title="AI Video Production" src="/works/ai/videos/ai-video-04.mp4" poster="/works/posters/ai-video-04.jpg" />
            </div>
            <div className="md:col-start-2 md:row-start-2">
              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">AI-assisted scenes and ad variations created from product references, with team direction and review for product accuracy and brand fit.</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Typical outputs</p>
              <p className="mt-2 text-sm text-[var(--muted)]">AI scenes · Advertising variations</p>
              <Link href="/services/ai-video" className="mt-5 inline-flex min-h-9 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                Explore AI Video <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="product-photography" className="scroll-mt-24 border-b border-[#1b3b2f]/15">
          <div className="mx-auto grid max-w-7xl gap-5 px-6 py-8 md:grid-cols-[3rem_minmax(0,1fr)_minmax(17rem,0.8fr)] md:items-start md:gap-x-8 md:gap-y-4 md:py-11">
            <span className="pt-1 text-xs font-semibold tracking-[0.16em] text-[#896333] md:col-start-1 md:row-start-1">05</span>
            <h2 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl md:col-start-2 md:row-start-1">Product Photography</h2>
            <div className="relative aspect-video overflow-hidden rounded-md bg-[#d8d6cc] md:col-start-3 md:row-start-1 md:row-span-2">
              <Image src={cdnUrl("/works/photo/accessories/accessories_1.jpg")} alt="Studio photograph of a hair accessory worn by a model" fill loading="eager" sizes="(min-width: 1024px) 32vw, (min-width: 768px) 40vw, 100vw" className="object-cover object-[center_30%]" />
              <span className="absolute bottom-4 left-4 bg-[#17382d]/85 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Photography preview</span>
            </div>
            <div className="md:col-start-2 md:row-start-2">
              <p className="max-w-xl text-base leading-relaxed text-[var(--muted)]">Studio and lifestyle photography that shows the product clearly and gives your brand a consistent visual language across ecommerce and campaigns.</p>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Typical outputs</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">Product stills · Detail images · Lifestyle photography</p>
              <Link href="/work" className="mt-7 inline-flex min-h-9 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                View photography work <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20" aria-labelledby="category-directory-title">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Explore by Product Category</p>
            <h2 id="category-directory-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Find work in your category.</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">Browse the existing video and photography collections by product type.</p>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="border-b border-[#1b3b2f]/20 pb-4 text-sm font-semibold uppercase tracking-[0.14em]">Video Production</h3>
              <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8">
                {videoProductionCategories.map((category) => (
                  <Link key={category.slug} href={`/services/${category.slug}`} className="flex min-h-14 items-center justify-between gap-2 border-b border-[#1b3b2f]/10 py-3 text-sm transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] sm:text-base">
                    {category.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="border-b border-[#1b3b2f]/20 pb-4 text-sm font-semibold uppercase tracking-[0.14em]">Product Photography</h3>
              <div className="grid grid-cols-2 gap-x-5 sm:gap-x-8">
                {photoCategories.map((category) => (
                  <Link key={category.slug} href={`/services/${category.slug}`} className="flex min-h-14 items-center justify-between gap-2 border-b border-[#1b3b2f]/10 py-3 text-sm transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] sm:text-base">
                    {category.label} <span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
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
