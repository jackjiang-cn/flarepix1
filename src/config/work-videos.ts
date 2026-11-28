import { videoProductionCategories, videoProductionSources } from "./categories";
import { brandFilm02Web, industryVideos, posterFor } from "./cdn";
import { newPortfolioVideos } from "./new-portfolio-videos";
import { portfolioVideoDetails, portfolioVideoSource } from "./portfolio-videos";

export type WorkVideoType = "film" | "advertising" | "demonstration" | "ai";

type VideoDetails = {
  title: string;
  types: readonly WorkVideoType[];
  poster?: string;
  preferredSource?: string;
};

export type WorkVideo = {
  title: string;
  types: readonly WorkVideoType[];
  category: string;
  src: string;
  poster: string;
};

// Product archive source paths identify projects across the product and brand film galleries.
const existingVideos: Record<string, VideoDetails> = {
  "/works/video/Electronics/product-video-09.m4v": {
    title: "Arboleaf Body Composition Scale",
    types: ["advertising"],
  },
  "/works/video/Electronics/product-video-10.m4v": {
    title: "Smart Scale at Home",
    types: ["advertising"],
  },
  "/works/video/Electronics/product-video-06.mp4": {
    title: "Wearable Mobility Assist Outdoors",
    types: ["advertising"],
  },
  "/works/video/Electronics/product-video-05.mp4": {
    title: "Wearable Mobility Assist Setup",
    types: ["demonstration"],
  },
  [industryVideos.fashionApparel]: {
    title: "Kids’ Raincoats",
    types: ["advertising"],
  },
  "/works/video/Kids & Toys/product-video-03.mp4": {
    title: "Kids’ Headphones",
    types: ["advertising"],
  },
  "/works/video/Kids & Toys/product-video-11.mp4": {
    title: "Baby Diapers at Home",
    types: ["advertising"],
  },
  "/works/video/Kids & Toys/product-video-12.m4v": {
    title: "Interactive Boxing Game",
    types: ["film", "demonstration"],
  },
  "/works/video/Kids & Toys/product-video-13.m4v": {
    title: "A Day at Play",
    types: ["film", "advertising"],
    poster: "/work-a-day-at-play-v1.webp",
  },
  "/works/video/Kids & Toys/product-video-14.m4v": {
    title: "Family Stroller Wagon",
    types: ["demonstration"],
  },
  "/works/video/Kids & Toys/product-video-15.m4v": {
    title: "Familidoo Stroller Wagon",
    types: ["demonstration"],
  },
  "/works/video/Home & Kitchen/product-video-03.m4v": {
    title: "Familidoo Stroller Brand Film",
    types: ["film"],
    preferredSource: brandFilm02Web.src,
    poster: brandFilm02Web.poster,
  },
  [industryVideos.smallAppliances]: {
    title: "Momcozy D8 Baby Bottle Washer",
    types: ["demonstration"],
  },
  "/works/video/Fashion & Apparel/product-video-01.mp4": {
    title: "PHF Muslin Waffle Blanket",
    types: ["demonstration"],
  },
  "/works/video/Others/product-video-13.m4v": {
    title: "Kitchen Knife Film",
    types: ["film", "demonstration"],
    poster: "/works/posters/brand-film-06.jpg",
  },
  "/works/video/Sports & Fitness/product-video-08.m4v": {
    title: "Quick N Body Fitness Commercial",
    types: ["film"],
    poster: "/home-commercials-brand-films-v1.webp",
  },
  "/works/video/Sports & Fitness/product-video-07.m4v": {
    title: "Electric Scooter Lifestyle Film",
    types: ["film", "advertising"],
  },
  "/works/video/Sports & Fitness/product-video-04.mp4": {
    title: "CYCROWN Electric Bike",
    types: ["advertising"],
  },
  "/works/video/Sports & Fitness/product-video-05.m4v": {
    title: "Smart Walking Pad Film",
    types: ["film", "demonstration"],
    poster: "/works/posters/brand-film-01.jpg",
  },
  "/works/video/Sports & Fitness/product-video-06.m4v": {
    title: "HF1114P Treadmill Film",
    types: ["film", "demonstration"],
    preferredSource: "/works/brand-film/brand-film-03.m4v",
    poster: "/works/posters/brand-film-03.jpg",
  },
  "/works/video/Others/product-video-09.mp4": {
    title: "Automatic Pet Feeder",
    types: ["demonstration"],
    poster: "/work-automatic-pet-feeder-v1.webp",
  },
};

const existingAiWorkVideos: WorkVideo[] = [
  "AI product animation",
  "AI scene generation",
  "AI social video",
  "AI product video",
].map((title, index) => {
  const src = `/works/ai/videos/ai-video-0${index + 1}.mp4`;
  return { title, types: ["ai"], category: "AI Video", src, poster: posterFor(src) };
});

export const aiWorkVideos: WorkVideo[] = [
  ...newPortfolioVideos.filter((video) => video.category === "ai").map((video) => ({
    ...video,
    category: "AI Video",
  })),
  ...existingAiWorkVideos,
];

function productWorkVideo(src: string, category: string): WorkVideo {
  const details: VideoDetails = portfolioVideoDetails(src) ?? existingVideos[src] ?? {
    title: `${category} video`,
    types: ["demonstration"],
  };
  return {
    title: details.title,
    types: details.types,
    category,
    src: details.preferredSource ?? src,
    poster: details.poster ?? posterFor(src),
  };
}

export function workVideosForCategory(slug: string): WorkVideo[] {
  const category = videoProductionCategories.find((item) => item.slug === slug);
  if (!category) return [];
  return (videoProductionSources[slug] ?? []).map((src) => productWorkVideo(src, category.label));
}

const featuredSources = [
  portfolioVideoSource("outdoor-boots"),
  portfolioVideoSource("rgb-dj-tube-lights"),
  portfolioVideoSource("kids-basketball-hoop"),
  portfolioVideoSource("bread-slicer"),
];

const uniqueVideos = new Map<string, WorkVideo>();
for (const video of [...videoProductionCategories.flatMap(({ slug }) => workVideosForCategory(slug)), ...aiWorkVideos]) {
  if (!uniqueVideos.has(video.src)) uniqueVideos.set(video.src, video);
}

const featuredSourceSet = new Set(featuredSources);
export const workVideos = [
  ...featuredSources.flatMap((src) => uniqueVideos.get(src) ?? []),
  ...Array.from(uniqueVideos.values()).filter((video) => !featuredSourceSet.has(video.src)),
];

export const brandFilmWorkVideos = workVideos.filter((video) => video.types.includes("film"));
