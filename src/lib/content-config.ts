// Read display-order.json and merge with auto-discovered images from folders

type DisplayOrderConfig = {
  photoCategories: Record<string, string[]>;
  videoCategories: Record<string, string[]>;
};

const configUrl = "/content/display-order.json";

// Get the display order config (cached)
export async function getDisplayOrderConfig(): Promise<DisplayOrderConfig | null> {
  try {
    const res = await fetch(configUrl, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Get images for a specific photo category
// 1. First check display-order.json for manual order
// 2. Fall back to auto-discovering all files in the folder
export async function getPhotoSources(categorySlug: string): Promise<{ src: string; alt: string }[]> {
  const config = await getDisplayOrderConfig();

  // If manual order exists for this category, use it
  if (config?.photoCategories?.[categorySlug]) {
    return config.photoCategories[categorySlug].map((src) => ({
      src,
      alt: getAltFromPath(src),
    }));
  }

  // Auto-discover: return empty, will use default from config
  // (Auto-discovery requires server-side fs access, so we fall back to config defaults)
  return [];
}

// Get videos for a specific video category
export async function getVideoSources(categorySlug: string): Promise<string[]> {
  const config = await getDisplayOrderConfig();

  if (config?.videoCategories?.[categorySlug]) {
    return config.videoCategories[categorySlug];
  }

  return [];
}

function getAltFromPath(src: string): string {
  // Extract category and filename for alt text
  const parts = src.split("/");
  const filename = parts[parts.length - 1].replace(/\.[^.]+$/, "");
  const category = parts[parts.length - 2] || "";
  return `${category.replace(/-/g, " ")} - ${filename}`;
}