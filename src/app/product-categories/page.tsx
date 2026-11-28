import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceVideoPreview from "@/components/service-video-preview";
import { homepageVideos } from "@/config/homepage-videos";

export const metadata: Metadata = {
  title: "Product Categories | FlarePix",
  description:
    "Explore video and photography for small appliances, fashion and apparel, and consumer electronics by FlarePix.",
  alternates: { canonical: "https://www.flarepix.com/product-categories" },
  openGraph: {
    title: "Product Categories | FlarePix",
    description: "Video and photography shaped around small appliances, fashion and apparel, and consumer electronics.",
    url: "https://www.flarepix.com/product-categories",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix product categories" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Categories | FlarePix",
    description: "Video and photography for small appliances, fashion and apparel, and consumer electronics.",
    images: ["/og-image.jpg"],
  },
};

const categories = [
  {
    number: "01",
    id: "small-appliances",
    title: "Small Appliances",
    headline: "Show what it does, in real life.",
    description:
      "Demonstrate everyday use, key functions, and the details that are easier to understand in motion.",
    formats: "Product demonstrations · Short ads · Lifestyle photography",
    video: homepageVideos.momcozyD8,
    workHref: "/work?videocategory=home-kitchen#category-archive",
  },
  {
    number: "02",
    id: "fashion-apparel",
    title: "Fashion & Apparel",
    headline: "Show fit, movement, and feel.",
    description:
      "Put garments and accessories in context through movement, styling, and close attention to texture.",
    formats: "Campaign films · Social video · On-model photography",
    video: homepageVideos.degaiaMenswear,
    workHref: "/work?videocategory=fashion#category-archive",
  },
  {
    number: "03",
    id: "consumer-electronics",
    title: "Consumer Electronics",
    headline: "Make features easy to understand.",
    description:
      "Show interfaces, key features, and real-world interaction while keeping the product visually clear.",
    formats: "Product demos · Advertising creatives · Studio photography",
    video: homepageVideos.robotDog,
    workHref: "/work?videocategory=electronics#category-archive",
  },
] as const;

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.flarepix.com" },
    { "@type": "ListItem", position: 2, name: "Product Categories", item: "https://www.flarepix.com/product-categories" },
  ],
};

export default function ProductCategoriesPage() {
  return (
    <>
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Product Categories</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
            <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
              Creative that fits what you sell.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)] sm:text-lg lg:pb-2">
              From everyday-use demonstrations to campaign films, we shape video and photography around each product category and its audience.
            </p>
          </div>
          <nav aria-label="Product categories" className="mt-14 grid border-t border-[#1b3b2f]/20 sm:grid-cols-3">
            {categories.map((category) => (
              <Link key={category.id} href={`#${category.id}`} className="group flex min-h-16 items-center justify-between gap-3 border-b border-[#1b3b2f]/20 py-4 text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0">
                <span><span className="mr-3 text-xs text-[#896333]">{category.number}</span>{category.title}</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-y-1">↓</span>
              </Link>
            ))}
          </nav>
        </section>

        {categories.map((category, index) => (
          <section key={category.id} id={category.id} className={`scroll-mt-24 border-t border-[#1b3b2f]/15 ${index % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--background)]"}`} aria-labelledby={`${category.id}-title`}>
            <div className="mx-auto grid max-w-7xl gap-9 px-6 py-16 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-16 lg:py-24">
              <div className={index === 1 ? "lg:order-2" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">{category.number} / {category.title}</p>
                <h2 id={`${category.id}-title`} className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-5xl">{category.headline}</h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--muted)] sm:text-lg">{category.description}</p>
                <div className="mt-8 border-t border-[#1b3b2f]/20 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#896333]">Content formats</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{category.formats}</p>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                  <Link href={category.workHref} className="inline-flex min-h-9 items-center gap-2 border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                    View Video Work <span aria-hidden="true">↗</span>
                  </Link>
                  <Link href="/contact" className="inline-flex min-h-9 items-center gap-2 border-b border-[#896333] text-sm font-semibold text-[#896333] transition-colors hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                    Discuss a Project <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
              <div className={index === 1 ? "lg:order-1" : ""}>
                <ServiceVideoPreview {...category.video} />
              </div>
            </div>
          </section>
        ))}

        <section className="border-t border-[#1b3b2f]/15 bg-[var(--background)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Your Product</p>
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
