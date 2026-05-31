import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { photoCategories, videoProductionCategories, videoProductionSources } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";

export const metadata: Metadata = {
  title: "Our Work — FlarePix",
  description:
    "Portfolio of product photography, video, and AI imagery work by FlarePix.",
  alternates: {
    canonical: "https://flarepix.com/work",
  },
};

// Build photo tabs from config
const photoTabs = photoCategories.map(cat => ({
  slug: cat.slug,
  label: cat.label,
  folder: cat.slug,
  count: photoSources[cat.slug]?.length || 0,
}));

// Build video list from config
const getVideosFromConfig = () => {
  const videos: { src: string; label: string; category: string }[] = [];
  videoProductionCategories.forEach(cat => {
    const sources = videoProductionSources[cat.slug] || [];
    sources.forEach((src, i) => {
      videos.push({
        src,
        label: `${cat.label} video ${i + 1}`,
        category: cat.slug,
      });
    });
  });
  return videos;
};
const allVideos = getVideosFromConfig();

// Build photo sources from config
const getPhotosForCategory = (slug: string | null) => {
  if (!slug || slug === "all") {
    // "All" - get first 4 from each category
    return photoCategories.flatMap(cat =>
      (photoSources[cat.slug] || []).slice(0, 4).map(p => ({
        ...p,
        alt: `${cat.label} product photography`,
      }))
    );
  }
  return (photoSources[slug] || []).map(p => ({
    ...p,
    alt: `${slug.replace('-', ' ')} product photography`,
  }));
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = params.category || "all";
  const currentCat = photoTabs.find(c => c.slug === activeCategory);
  const photos = getPhotosForCategory(activeCategory === "all" ? null : activeCategory);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Our work</h1>
            <p className="mt-2 text-[var(--muted)]">
              Product photography, video, and AI imagery across all categories
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-amber-400"
          >
            Get a quote
          </Link>
        </div>

        {/* Category filter tabs */}
        <div className="mt-8 flex flex-wrap gap-3">
          {photoTabs.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/work" : `/work?category=${cat.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === cat.slug
                  ? "bg-[var(--amber)] text-black"
                  : "bg-[var(--surface)] text-[var(--muted)] hover:text-white"
              }`}
            >
              {cat.label}
              {cat.count > 0 && <span className="ml-1 opacity-60">({cat.count})</span>}
            </Link>
          ))}
        </div>

        {/* Videos section */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">Videos</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allVideos.map((v, i) => (
              <div
                key={`${v.src}-${i}`}
                className="overflow-hidden rounded-lg bg-[var(--surface)] aspect-video"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </section>

        {/* Photography section */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold">
            Photography
            {currentCat && currentCat.slug !== "all" && (
              <span className="ml-3 text-base font-normal text-[var(--muted)]">
                — {currentCat.label}
              </span>
            )}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((p, i) => (
              <div
                key={`${p.src}-${i}`}
                className="overflow-hidden rounded-lg bg-[var(--surface)] aspect-[4/3]"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl border border-white/[0.06] bg-[var(--surface)] p-8">
          <h3 className="text-xl font-semibold">Need visuals for your products?</h3>
          <p className="mt-2 text-[var(--muted)]">
            We work with brands across all categories — from electronics to fashion, home goods to kids toys.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-amber-400"
            >
              Get a quote
            </Link>
            <Link
              href="/work?category=all"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--amber)] px-7 py-3 text-sm font-medium text-[var(--amber)] transition-colors hover:bg-[var(--amber)] hover:text-black"
            >
              View all categories
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}