import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PhotoGallery from "@/components/photo-gallery";
import ServiceVideoPreview from "@/components/service-video-preview";
import WorkVideoGallery, { type WorkVideo } from "@/components/work-video-gallery";
import { photoCategories, videoProductionCategories, videoProductionSources } from "@/config/categories";
import { photoSources } from "@/config/photo-sources";
import { cdnUrl, industryVideos, posterFor } from "@/config/cdn";

export const metadata: Metadata = {
  title: "Selected Work | FlarePix",
  description:
    "Explore FlarePix commercials, advertising creatives, product demonstrations, AI video, and product photography for consumer brands.",
  alternates: { canonical: "https://www.flarepix.com/work" },
  openGraph: {
    title: "Selected Work | FlarePix",
    description: "Commercials, advertising creatives, product demonstrations, AI video, and photography for consumer brands.",
    url: "https://www.flarepix.com/work",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "FlarePix selected work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work | FlarePix",
    description: "Commercials, advertising creatives, product demonstrations, AI video, and photography for consumer brands.",
    images: ["/og-image.jpg"],
  },
};

const featuredWork = [
  {
    type: "Product commercial",
    title: "Momcozy D8 Baby Bottle Washer",
    description:
      "A kitchen counter crowded with baby bottles sets up a familiar chore. The film shows how the D8 fits into that routine, from loading bottles and accessories to running a wash cycle.",
    approach:
      "Live-action kitchen scenes show the washer in use. Close-ups highlight the controls, and cutaway graphics show how water moves through the machine.",
    featuredCut: "1:46 · 16:9",
    src: industryVideos.smallAppliances,
    poster: posterFor(industryVideos.smallAppliances),
  },
  {
    type: "Consumer brand film",
    title: "A Day at Play",
    description:
      "A child runs through the garden, shares a snack, and plays with toys at home. The closing line, “More Joy in Every Moment,” ties those scenes together.",
    approach:
      "Wide shots follow the child in motion. Close-ups of hands, faces, and toys pick out small moments before the edit settles on a holiday display.",
    featuredCut: "0:35 · 16:9",
    src: "/works/brand-film/brand-film-09.m4v",
    poster: "/work-a-day-at-play-v1.webp",
  },
] as const;

const browseVideos: WorkVideo[] = [
  { title: "Kids & toys film", type: "film", category: "Film", src: "/works/brand-film/brand-film-05.m4v" },
  { title: "Kitchenware film", type: "film", category: "Film", src: "/works/brand-film/brand-film-06.m4v" },
  { title: "Consumer electronics", type: "advertising", category: "Electronics", src: "/works/video/Electronics/product-video-09.m4v" },
  { title: "Fashion & apparel", type: "advertising", category: "Fashion", src: industryVideos.fashionApparel },
  { title: "Small appliances", type: "demonstration", category: "Appliances", src: industryVideos.smallAppliances },
  { title: "AI product scene", type: "ai", category: "AI Video", src: "/works/ai/videos/ai-video-04.mp4" },
  { title: "AI lifestyle scene", type: "ai", category: "AI Video", src: "/works/ai/videos/ai-video-01.mp4" },
];

const photographyPreview = [
  { label: "Fashion", href: "/work?category=womens-fashion", src: "/works/photo/womens-fashion/womens-fashion_19.jpg", alt: "Fashion photography preview" },
  { label: "Accessories", href: "/work?category=accessories", src: "/works/photo/accessories/accessories_1.jpg", alt: "Accessory photography preview" },
  { label: "Products", href: "/work?category=products", src: "/works/photo/products/products_1.jpg", alt: "Product photography preview" },
  { label: "Sports", href: "/work?category=sports", src: "/works/photo/sports/sports_1.jpg", alt: "Sports photography preview" },
] as const;

const aiImages = [1, 2, 3, 4, 5, 6].map((number) => ({
  src: `/works/ai/images/ai-image-0${number}.webp`,
  alt: "AI-generated visual work",
}));
const aiVideos = [1, 2, 3, 4].map((number) => `/works/ai/videos/ai-video-0${number}.mp4`);

const workSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Selected Work — FlarePix",
  description: "Commercials, advertising creatives, product demonstrations, AI video, and photography by FlarePix.",
  url: "https://www.flarepix.com/work",
  mainEntity: { "@type": "Organization", name: "FlarePix", url: "https://www.flarepix.com" },
};

type WorkParams = { category?: string; videocategory?: string; aicategory?: string };

export default async function WorkPage({ searchParams }: { searchParams: Promise<WorkParams> }) {
  const params = await searchParams;
  const archive = params.videocategory !== undefined
    ? "video"
    : params.category !== undefined
      ? "photo"
      : params.aicategory !== undefined
        ? "ai"
        : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }} />
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">FlarePix / Work</p>
          <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-[clamp(3.25rem,7vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.065em]">Selected Work</h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Commercials, advertising creatives, product demonstrations, AI video, and photography created for consumer brands.
              </p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-md bg-[var(--amber)] px-6 text-sm font-semibold text-[#142e25] transition-colors hover:bg-[#c8aa70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
              Discuss a Project <span className="ml-3" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        {archive ? (
          <ArchiveView archive={archive} params={params} />
        ) : (
          <>
            <section id="featured-work" className="border-t border-[#1b3b2f]/15 py-16 sm:py-20" aria-labelledby="featured-work-title">
              <div className="mx-auto max-w-7xl px-6">
                <h2 id="featured-work-title" className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Featured Projects</h2>
                <div className="mt-10 border-t border-[#1b3b2f]/20">
                  {featuredWork.map((project, index) => (
                    <article key={project.src} className="grid gap-7 border-b border-[#1b3b2f]/20 py-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-14">
                      <div className={index % 2 === 0 ? "lg:order-last" : ""}>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#896333]">{project.type}</p>
                        <h3 className="mt-4 max-w-md text-3xl font-semibold leading-[1.12] tracking-[-0.045em] sm:text-4xl">{project.title}</h3>
                        <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--muted)]">{project.description}</p>
                        <dl className="mt-6 max-w-md divide-y divide-[#1b3b2f]/15 border-t border-[#1b3b2f]/15">
                          <div className="py-4">
                            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Production approach</dt>
                            <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{project.approach}</dd>
                          </div>
                          <div className="pt-4">
                            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#896333]">Featured cut</dt>
                            <dd className="mt-2 text-sm text-[var(--foreground)]">{project.featuredCut}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <ServiceVideoPreview title={project.title} src={project.src} poster={project.poster} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <WorkVideoGallery videos={browseVideos} />

            <section id="photography-work" className="border-t border-[#1b3b2f]/15 py-16 sm:py-20" aria-labelledby="photography-work-title">
              <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">02 / Photography</p>
                    <h2 id="photography-work-title" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Product Photography</h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">A selection of studio and lifestyle images across product categories.</p>
                  </div>
                  <Link href="/work?category=all" className="inline-flex min-h-9 items-center gap-2 self-start border-b border-[var(--foreground)] text-sm font-semibold transition-colors hover:text-[#896333] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                    View all photography <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
                  {photographyPreview.map((photo) => (
                    <Link key={photo.src} href={photo.href} className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--foreground)]">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#d8d6cc]">
                        <Image src={cdnUrl(photo.src)} alt={photo.alt} fill loading="eager" sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" />
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-2 text-sm font-semibold">
                        {photo.label} <span aria-hidden="true">↗</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-t border-[#1b3b2f]/15 py-12 sm:py-14">
              <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Explore by Product Category</p>
                  <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">Looking for a specific type of product?</h2>
                </div>
                <div className="flex flex-wrap gap-5">
                  <Link href="/work?videocategory=all" className="text-sm font-semibold underline underline-offset-4 hover:text-[#896333]">Video categories ↗</Link>
                  <Link href="/work?category=all" className="text-sm font-semibold underline underline-offset-4 hover:text-[#896333]">Photography categories ↗</Link>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="bg-[var(--surface)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Start a Project</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">Have a project in mind?</h2>
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

function ArchiveView({ archive, params }: { archive: "video" | "photo" | "ai"; params: WorkParams }) {
  const videoCategory = params.videocategory || "all";
  const photoCategory = params.category || "all";
  const aiCategory = params.aicategory || "all";
  const videos = videoProductionCategories.flatMap((category) =>
    (videoProductionSources[category.slug] || []).map((src) => ({ src, label: category.label, category: category.slug }))
  );
  const visibleVideos = videoCategory === "all"
    ? videos.filter((video, index) => videos.findIndex(({ src }) => src === video.src) === index)
    : videos.filter((video) => video.category === videoCategory);
  const visiblePhotos = photoCategory === "all"
    ? photoCategories.flatMap((category) => (photoSources[category.slug] || []).slice(0, 4))
    : photoSources[photoCategory] || [];

  return (
    <section id="category-archive" className="border-t border-[#1b3b2f]/15 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link href="/work" className="text-sm font-semibold underline underline-offset-4 hover:text-[#896333]">← Selected Work</Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#896333]">Browse the Archive</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
          {archive === "video" ? "Video by product category" : archive === "photo" ? "Photography by product category" : "AI work"}
        </h2>
        {archive === "video" && (
          <>
            <ArchiveLinks active={videoCategory} param="videocategory" categories={videoProductionCategories} />
            <div className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {visibleVideos.map((video) => (
                <div key={video.src}>
                  <ServiceVideoPreview title={`${video.label} video`} src={video.src} poster={posterFor(video.src)} />
                  <p className="mt-3 text-sm font-semibold">{video.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {archive === "photo" && (
          <>
            <ArchiveLinks active={photoCategory} param="category" categories={photoCategories} />
            <div className="mt-9"><PhotoGallery photos={visiblePhotos} /></div>
          </>
        )}
        {archive === "ai" && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { slug: "all", label: "All" },
                { slug: "ai-videos", label: "AI Videos" },
                { slug: "ai-images", label: "AI Images" },
              ].map((item) => (
                <Link key={item.slug} href={`/work?aicategory=${item.slug}`} className={`rounded-full border px-4 py-2 text-sm ${aiCategory === item.slug ? "border-[#17382d] bg-[#17382d] text-white" : "border-[#1b3b2f]/20"}`}>
                  {item.label}
                </Link>
              ))}
            </div>
            {(aiCategory === "all" || aiCategory === "ai-videos") && (
              <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {aiVideos.map((src) => <ServiceVideoPreview key={src} title="AI video" src={src} poster={posterFor(src)} />)}
              </div>
            )}
            {(aiCategory === "all" || aiCategory === "ai-images") && (
              <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {aiImages.map((image) => (
                  <div key={image.src} className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#d8d6cc]">
                    <Image src={cdnUrl(image.src)} alt={image.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ArchiveLinks({ active, param, categories }: {
  active: string;
  param: "videocategory" | "category";
  categories: { slug: string; label: string }[];
}) {
  return (
    <nav aria-label="Product category" className="mt-8 flex flex-wrap gap-2">
      {[{ slug: "all", label: "All" }, ...categories].map((category) => (
        <Link
          key={category.slug}
          href={`/work?${param}=${category.slug}`}
          aria-current={active === category.slug ? "page" : undefined}
          className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)] ${active === category.slug ? "border-[#17382d] bg-[#17382d] text-white" : "border-[#1b3b2f]/20 hover:border-[#1b3b2f]/60"}`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}
