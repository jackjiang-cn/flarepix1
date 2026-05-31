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