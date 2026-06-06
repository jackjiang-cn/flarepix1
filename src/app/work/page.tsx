import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WorkSectionToggle from "@/components/work-section-toggle";
import WorkCategoryPills from "@/components/work-category-pills";
import ClickableVideoCard from "@/components/clickable-video-card";
import { photoCategories, videoProductionCategories, videoProductionSources } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";
import { cdnUrl } from "@/config/cdn";

export const metadata: Metadata = {
  title: "Our Work — FlarePix",
  description:
    "Portfolio of product photography, video, and AI imagery work by FlarePix.",
  alternates: {
    canonical: "https://flarepix.com/work",
  },
  openGraph: {
    title: "Our Work — FlarePix",
    description:
      "Portfolio of product photography, video, and AI imagery work by FlarePix.",
    url: "https://flarepix.com/work",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix Work Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Work — FlarePix",
    description:
      "Portfolio of product photography, video, and AI imagery work.",
    images: ["/og-image.jpg"],
  },
};

const photoTabs = photoCategories.map(cat => ({
  slug: cat.slug,
  label: cat.label,
  folder: cat.slug,
  count: photoSources[cat.slug]?.length || 0,
}));

const videoTabs = videoProductionCategories.map(cat => ({
  slug: cat.slug,
  label: cat.label,
  count: videoProductionSources[cat.slug]?.length || 0,
}));

const aiTabs = [
  { slug: "ai-images", label: "AI Images", count: 6 },
  { slug: "ai-videos", label: "AI Videos", count: 4 },
];

const getAllVideos = () => {
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
const allVideos = getAllVideos();

const getAllPhotos = () =>
  photoCategories.flatMap(cat =>
    (photoSources[cat.slug] || []).slice(0, 4).map(p => ({
      ...p,
      alt: `${cat.label} product photography`,
    }))
  );

const aiImages = [
  { src: "/works/ai/images/ai-image-01.webp", alt: "AI-generated product image" },
  { src: "/works/ai/images/ai-image-02.webp", alt: "AI-generated product image" },
  { src: "/works/ai/images/ai-image-03.webp", alt: "AI-generated product image" },
  { src: "/works/ai/images/ai-image-04.webp", alt: "AI-generated product image" },
  { src: "/works/ai/images/ai-image-05.webp", alt: "AI-generated product image" },
  { src: "/works/ai/images/ai-image-06.webp", alt: "AI-generated product image" },
];

const aiVideos = [
  { src: "/works/ai/videos/ai-video-01.mp4", label: "AI video 1" },
  { src: "/works/ai/videos/ai-video-02.mp4", label: "AI video 2" },
  { src: "/works/ai/videos/ai-video-03.mp4", label: "AI video 3" },
  { src: "/works/ai/videos/ai-video-04.mp4", label: "AI video 4" },
];

const workSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Work — FlarePix",
  description: "Portfolio of product photography, video, and AI imagery work by FlarePix.",
  url: "https://flarepix.com/work",
  mainEntity: {
    "@type": "Organization",
    name: "FlarePix",
    url: "https://flarepix.com",
  },
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; videocategory?: string; aicategory?: string }>;
}) {
  const params = await searchParams;
  const photoOpen = params.category !== undefined;
  const videoOpen = params.videocategory !== undefined;
  const aiOpen = params.aicategory !== undefined;
  const anyOpen = photoOpen || videoOpen || aiOpen;

  const activeCategory = params.category || "all";
  const activeVideoCategory = params.videocategory || "all";
  const activeAiCategory = params.aicategory || "all";

  const photos = activeCategory === "all"
    ? getAllPhotos()
    : (photoSources[activeCategory] || []).map(p => ({
        ...p,
        alt: `${activeCategory.replace('-', ' ')} product photography`,
      }));
  const videos = activeVideoCategory === "all"
    ? allVideos
    : allVideos.filter(v => v.category === activeVideoCategory);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
      />
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
            className="shrink-0 inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#a37e4a]"
          >
            Get a quote
          </Link>
        </div>

        {/* 3 main toggles (accordion: only one open at a time) */}
        <div className="mt-8 flex flex-wrap gap-3">
          <WorkSectionToggle
            label="Videos"
            queryParam="videocategory"
            clearParams={["category", "aicategory"]}
          />
          <WorkSectionToggle
            label="Photography"
            queryParam="category"
            clearParams={["videocategory", "aicategory"]}
          />
          <WorkSectionToggle
            label="AI"
            queryParam="aicategory"
            clearParams={["videocategory", "category"]}
          />
        </div>

        {/* When a section is open: sub-categories (top) + content (right below) */}
        {videoOpen && (
          <div className="mt-6">
            <WorkCategoryPills
              tabs={videoTabs}
              activeCategory={activeVideoCategory}
              queryParam="videocategory"
              targetId=""
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((v, i) => (
                <ClickableVideoCard key={`${v.src}-${i}`} src={v.src} label={v.label} />
              ))}
            </div>
          </div>
        )}

        {photoOpen && (
          <div className="mt-6">
            <WorkCategoryPills
              tabs={photoTabs}
              activeCategory={activeCategory}
              queryParam="category"
              targetId=""
            />
            <div className="mt-6 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
              {photos.map((p, i) => (
                <div key={`${p.src}-${i}`} className="mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden rounded-lg bg-[var(--surface)]">
                    <Image
                      src={cdnUrl(p.src)}
                      alt={p.alt}
                      width={400}
                      height={267}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aiOpen && (
          <div className="mt-6">
            <WorkCategoryPills
              tabs={aiTabs}
              activeCategory={activeAiCategory}
              queryParam="aicategory"
              targetId=""
            />
             <div className="mt-6 [column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
              {activeAiCategory === "ai-images" || activeAiCategory === "all" ? (
                aiImages.map((img, i) => (
                  <div key={img.src} className="mb-4 break-inside-avoid">
                    <div className="relative overflow-hidden rounded-lg bg-[var(--surface)]">
                      <Image
                        src={cdnUrl(img.src)}
                        alt={img.alt}
                        width={400}
                        height={500}
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))
              ) : null}
              {activeAiCategory === "ai-videos" || activeAiCategory === "all" ? (
                aiVideos.map((v, i) => (
                  <ClickableVideoCard key={v.src} src={v.src} label={v.label} />
                ))
              ) : null}
            </div>
          </div>
        )}

        {/* Default state: no section open, show all videos and all photos */}
        {!anyOpen && (
          <div className="mt-6 space-y-12">
            {/* Videos first */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allVideos.map((v, i) => (
                <ClickableVideoCard key={`${v.src}-${i}`} src={v.src} label={v.label} />
              ))}
            </div>
            {/* Photos in masonry layout */}
            <div className="[column-fill:_balance] columns-2 sm:columns-3 lg:columns-4 gap-4">
              {getAllPhotos().map((p, i) => (
                <div key={`${p.src}-${i}`} className="mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden rounded-lg bg-[var(--surface)]">
                    <Image
                      src={cdnUrl(p.src)}
                      alt={p.alt}
                      width={400}
                      height={267}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center rounded-2xl border border-black/[0.08] bg-[var(--surface)] p-8">
          <h3 className="text-xl font-semibold">Need visuals for your products?</h3>
          <p className="mt-2 text-[var(--muted)]">
            We work with brands across all categories — from electronics to fashion, home goods to kids toys.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--amber)] px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-[#a37e4a]"
            >
              Get a quote
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--amber)] px-7 py-3 text-sm font-medium text-[var(--amber)] transition-colors hover:bg-[var(--amber)] hover:text-black"
            >
              View all services
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
