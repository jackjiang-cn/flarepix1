import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { videoCategories, photoCategories, videoProductionCategories, videoProductionSources } from "@/config/categories";
import { cdnUrl, posterFor } from "@/config/cdn";

// Video production categories from config
// videoProductionCategories imported from @/config/categories

export const metadata: Metadata = {
  title: "Product Photography & Video Services for Ecommerce — FlarePix",
  description:
    "Product photography, video production, AI imagery, and AI video for Amazon and ecommerce brands. From white background shots to cinematic brand films — one studio, one workflow.",
  alternates: {
    canonical: "https://flarepix.com/services",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "FlarePix Product Visual Services",
  description: "Professional product photography, video, AI imagery, and AI video services for ecommerce brands including Amazon sellers",
  provider: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Product Visual Services",
    itemListElement: [
      { "@type": "Offer", name: "Product Photography" },
      { "@type": "Offer", name: "Product Video Production" },
      { "@type": "Offer", name: "AI Imagery" },
      { "@type": "Offer", name: "AI Video" },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Professional product visuals for ecommerce — organized by product
          category. Click through to see examples and learn about our process.
        </p>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">
          Whether you need <strong>product photography</strong> for Amazon listings, <strong>video production</strong> for social media, or <strong>AI-generated imagery</strong> at scale, we handle everything in one studio workflow. Based in Qingdao, China — serving Amazon and ecommerce sellers worldwide.
        </p>

        {/* Video Production */}
        <section className="mt-16 scroll-mt-24" id="video-production">
          <h2 className="text-xl font-semibold">Video Production</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videoProductionCategories.map((cat, i) => {
              const firstVideo = videoProductionSources[cat.slug]?.[0];
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="group block rounded-2xl border border-black/[0.08] bg-[var(--surface)] overflow-hidden transition-colors hover:border-black/[0.15]"
                >
                  <div className="bg-[var(--background)] p-2">
                    <div className="relative w-full aspect-video overflow-hidden rounded">
                      {firstVideo ? (
                        <Image
                          src={cdnUrl(posterFor(firstVideo))}
                          alt={cat.label}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0"
                            style={{
                              background: `linear-gradient(${135 + (i * 23) % 90}deg, #1b3b2f 0%, #2d5a47 50%, #0f2a22 100%)`,
                            }}
                          />
                          <div
                            className="absolute inset-0 opacity-30 mix-blend-overlay"
                            style={{
                              background: `radial-gradient(circle at ${30 + (i * 17) % 40}% ${40 + (i * 13) % 30}%, rgba(184,151,92,0.4), transparent 60%)`,
                            }}
                          />
                        </>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1b3b2f">
                            <polygon points="6 3 20 12 6 21 6 3"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold group-hover:text-[var(--amber)] transition-colors">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Product Photography */}
        <section className="mt-16 scroll-mt-24" id="product-photography">
          <h2 className="text-xl font-semibold">Product Photography</h2>
          <div className="mt-6 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
            {photoCategories.map((cat) => {
              const imageMap: Record<string, string> = {
                "womens-fashion": "/works/photo/womens-fashion/womens-fashion_19.jpg",
                "mens": "/works/photo/mens/mens_9.jpg",
                "kids": "/works/photo/kids/kids_1.jpg",
                "accessories": "/works/photo/accessories/accessories_1.jpg",
                "products": "/works/photo/products/products_1.jpg",
                "other": "/works/photo/other/other_1.jpg",
                "womens-underwear": "/works/photo/womens-underwear/womens-underwear_1.jpg",
                "sports": "/works/photo/sports/sports_1.jpg",
                "others": "/works/photo/other/other_1.jpg",
              };
              const previewImg = imageMap[cat.slug] || "/works/photo/other/other_1.jpg";
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="group block rounded-2xl border border-black/[0.08] bg-[var(--surface)] overflow-hidden transition-colors hover:border-black/[0.15] mb-4 break-inside-avoid"
                >
                  <div className="bg-[var(--background)] p-2">
                    <Image
                      src={cdnUrl(previewImg)}
                      alt={cat.label}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold group-hover:text-[var(--amber)] transition-colors">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Brand Film — big card */}
        <section className="mt-8" id="brand-film">
          <Link
            href="/services/brand-film"
            className="group block overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--surface)] transition-colors hover:border-black/[0.15]"
          >
            <div className="grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <p className="mb-3 text-sm font-medium text-[var(--amber)]">
                  Premium tier
                </p>
                <h2 className="text-2xl font-semibold group-hover:text-[var(--amber)] transition-colors">
                  Brand Film Production
                </h2>
                <p className="mt-4 max-w-md text-[var(--muted)]">
                  Cinematic brand films and commercial productions for your
                  biggest launches. Full creative direction, professional
                  lighting, and post-production.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[var(--amber)]">
                  View showcase
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
              {/* Preview poster thumbnail (first frame of brand film) */}
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <Image
                  src={cdnUrl(posterFor("/works/brand-film/brand-film-07.m4v"))}
                  alt="Brand Film Production sample"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#1b3b2f">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* AI Imagery — big card */}
        <section className="mt-16" id="ai-imagery">
          <Link
            href="/services/ai-imagery"
            className="group block overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--surface)] transition-colors hover:border-black/[0.15]"
          >
            <div className="grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-[var(--amber)] transition-colors">
                  AI Imagery
                </h2>
                <p className="mt-4 max-w-md text-[var(--muted)]">
                  AI-generated lifestyle scenes, on-model imagery, and campaign
                  visuals — built from real product photos. No physical shipping
                  needed, fast turnaround.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[var(--amber)]">
                  View examples
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
              {/* Preview thumbnails */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  "/works/ai/images/ai-image-01.webp",
                  "/works/ai/images/ai-image-02.webp",
                  "/works/ai/images/ai-image-03.webp",
                ].map((src) => (
                  <div
                    key={src}
                    className="relative overflow-hidden rounded-lg bg-[var(--background)] aspect-[4/5]"
                  >
                    <Image
                      src={cdnUrl(src)}
                      alt=""
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Link>
        </section>

        {/* AI Video — big card */}
        <section className="mt-8" id="ai-video">
          <Link
            href="/services/ai-video"
            className="group block overflow-hidden rounded-2xl border border-black/[0.08] bg-[var(--surface)] transition-colors hover:border-black/[0.15]"
          >
            <div className="grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
              <div>
                <h2 className="text-2xl font-semibold group-hover:text-[var(--amber)] transition-colors">
                  AI Video
                </h2>
                <p className="mt-4 max-w-md text-[var(--muted)]">
                  AI-generated short videos from product images. Fast, scalable,
                  ready for social media and ecommerce. Generate video content
                  remotely — no shoot required.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[var(--amber)]">
                  View examples
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
              {/* Preview poster thumbnail (first frame of AI video) */}
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <img
                  src={cdnUrl(posterFor("/works/ai/videos/ai-video-02.mp4"))}
                  alt="AI-generated product video sample"
                  className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#1b3b2f">
                      <polygon points="6 3 20 12 6 21 6 3"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
