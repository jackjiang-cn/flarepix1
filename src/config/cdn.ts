// CDN base URL configuration
// All media files are stored in Cloudflare R2 with custom domain
export const CDN_BASE = "https://media.flarepix.com";

export const brandFilm02Web = {
  src: "/works/brand-film/brand-film-02-web.mp4?v=3caff7ab",
  poster: "/works/posters/brand-film-02.jpg",
} as const;

export const industryVideos = {
  smallAppliances: "/works/video/Home & Kitchen/product-video-02.mp4",
  fashionApparel: "/works/video/Kids & Toys/product-video-10.mp4",
} as const;

const industryPosters: Partial<Record<string, string>> = {
  [industryVideos.smallAppliances]: "/industry-small-appliances-momcozy-d8-v1.webp",
  [industryVideos.fashionApparel]: "/industry-fashion-raincoat-v1.webp",
};

// Helper to build CDN URL
export const cdnUrl = (path: string) => {
  // If path already starts with http, return as is
  if (path.startsWith("http")) return path;
  // Otherwise prepend CDN base
  return `${CDN_BASE}${path}`;
};

// Derive a poster thumbnail path from a video src.
// e.g. "/works/video/Electronics/foo.m4v" -> "/works/posters/foo.jpg"
export const posterFor = (videoSrc: string): string => {
  const base = videoSrc.split("/").pop()?.replace(/\.[^.]+$/, "");
  return industryPosters[videoSrc] ?? `/works/posters/${base}.jpg`;
};

export const resolvePosterUrl = (poster: string): string =>
  poster.startsWith("/works/") ? cdnUrl(poster) : poster;
