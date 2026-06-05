import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CtaButton from "@/components/cta-button";
import GalleryLightbox from "@/components/gallery-lightbox";
import { photoCategories, videoProductionCategories, videoProductionSources } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";

export function generateStaticParams() {
  const allSlugs = [
    ...photoCategories.map((c) => c.slug),
    ...videoProductionCategories.map((c) => c.slug),
  ];
  return allSlugs.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  // Check photo categories first
  const photoCat = photoCategories.find((c) => c.slug === category);
  if (photoCat) {
    return {
      title: `${photoCat.label} Photography — FlarePix`,
      description: photoCat.description,
      alternates: {
        canonical: `https://flarepix.com/services/${category}`,
      },
      openGraph: {
        title: `${photoCat.label} Photography — FlarePix`,
        description: photoCat.description,
        url: `https://flarepix.com/services/${category}`,
        type: "website",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${photoCat.label} Photography` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${photoCat.label} Photography — FlarePix`,
        description: photoCat.description,
        images: ["/og-image.jpg"],
      },
    };
  }

  // Check video production categories
  const videoCat = videoProductionCategories.find((c) => c.slug === category);
  if (videoCat) {
    return {
      title: `${videoCat.label} Video Production — FlarePix`,
      description: videoCat.description,
      alternates: {
        canonical: `https://flarepix.com/services/${category}`,
      },
      openGraph: {
        title: `${videoCat.label} Video Production — FlarePix`,
        description: videoCat.description,
        url: `https://flarepix.com/services/${category}`,
        type: "website",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${videoCat.label} Video Production` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${videoCat.label} Video Production — FlarePix`,
        description: videoCat.description,
        images: ["/og-image.jpg"],
      },
    };
  }

  return {};
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Check photo categories first
  const photoCat = photoCategories.find((c) => c.slug === category);
  const videoCat = videoProductionCategories.find((c) => c.slug === category);

  if (!photoCat && !videoCat) notFound();

  const isPhotoCategory = !!photoCat;
  const cat = photoCat ?? videoCat!;
  const photos = photoSources[category] || [];
  const displayPhotos = photos.slice(0, 12);
  const displayVideos = (videoProductionSources[category] || []).slice(0, 6);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://flarepix.com" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://flarepix.com/services" },
      { "@type": "ListItem", position: 3, name: cat.label, item: `https://flarepix.com/services/${category}` },
    ],
  };

  // VideoObject schema only for video category pages
  const videoSchema = isPhotoCategory ? null : {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `${cat.label} Video Production — FlarePix`,
    description: `Professional ${cat.label.toLowerCase()} video production for Amazon and ecommerce sellers. Real footage combined with AI-assisted post-production.`,
    thumbnailUrl: `https://media.flarepix.com/works/posters/${category}.jpg`,
    uploadDate: "2026-01-15",
  };

  const schemas = videoSchema ? [breadcrumbSchema, videoSchema] : [breadcrumbSchema];

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <Link
          href={`/services#${isPhotoCategory ? "product-photography" : "video-production"}`}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          &larr; All services
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {cat.label}
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--muted)]">{cat.description}</p>

        {/* Gallery */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">
            {isPhotoCategory ? "Example photos" : "Example videos"}
          </h2>

          {isPhotoCategory ? (
            <GalleryLightbox
              items={displayPhotos.map((p, i) => ({ src: p.src, type: "image" as const, alt: p.alt || `${cat.label} photo ${i + 1}` }))}
              masonry={true}
            />
          ) : (
            <GalleryLightbox
              items={displayVideos.map((src, i) => ({ src, type: "video" as const, title: `${cat.label} video ${i + 1}` }))}
            />
          )}
        </section>

        {/* Use cases */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">What this is used for</h2>
          <p className="mt-2 max-w-2xl text-[var(--muted)]">
            {cat.label} video content serves multiple purposes across your ecommerce and marketing channels.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {isPhotoCategory ? (
              <>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Amazon listing images</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Main gallery images and A+ content visuals that meet Amazon&apos;s image requirements and drive click-through.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Ecommerce storefronts</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Shopify, WooCommerce, and other platform imagery with consistent styling that fits your brand identity.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Social media content</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Platform-ready visuals for Instagram, Facebook, and Pinterest that stop the scroll and drive engagement.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Paid advertising</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    High-converting ad creatives for Amazon Sponsored Products, Meta, and Google Display campaigns.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Amazon listing video</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Hero video on your Amazon listing — directly impacts conversion rate and buy box performance.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Social media advertising</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Short-form content for TikTok, Instagram Reels, and Facebook feed — optimised for each platform&apos;s format.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Brand film &amp; launch video</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Cinematic brand storytelling for product launches, trade shows, and investor presentations.
                  </p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6">
                  <p className="font-medium">Retail &amp; wholesale pitch</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Professional visual assets for retailer submissions and B2B sales conversations.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Stats or more info */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">
              {isPhotoCategory ? `${photos.length}+` : "12+"}
            </p>
            <p className="mt-1 text-sm text-[var(--muted)]">Projects completed</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">2-5</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Business days turnaround</p>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-[var(--surface)] p-6 text-center">
            <p className="text-3xl font-bold text-[var(--amber)]">∞</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Revisions included</p>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <CtaButton href="/contact">Get a quote</CtaButton>
          <Link
            href={`/services#${isPhotoCategory ? "product-photography" : "video-production"}`}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--amber)] px-7 py-3 text-sm font-medium text-[var(--amber)] transition-colors hover:bg-[var(--amber)] hover:text-black"
          >
            All services
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}