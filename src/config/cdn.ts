// CDN base URL configuration
// All media files are stored in Cloudflare R2 with custom domain
export const CDN_BASE = "https://media.flarepix.com";

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
  return `/works/posters/${base}.jpg`;
};