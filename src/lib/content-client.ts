// Client-side content configuration reader

const CONFIG_URL = "/content/display-order.json";

export type DisplayOrderConfig = {
  photoCategories: Record<string, string[]>;
  videoCategories: Record<string, string[]>;
};

// Cache the config
let cachedConfig: DisplayOrderConfig | null = null;
let fetchPromise: Promise<DisplayOrderConfig | null> | null = null;

export async function getDisplayOrder(): Promise<DisplayOrderConfig | null> {
  if (cachedConfig) return cachedConfig;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch(CONFIG_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    })
    .then((data) => {
      cachedConfig = data;
      return data;
    })
    .catch(() => null);

  return fetchPromise;
}

export async function getPhotosForCategory(slug: string): Promise<string[]> {
  const config = await getDisplayOrder();
  return config?.photoCategories?.[slug] ?? [];
}

export async function getVideosForCategory(slug: string): Promise<string[]> {
  const config = await getDisplayOrder();
  return config?.videoCategories?.[slug] ?? [];
}

// Simple synchronous fallback (use default config)
export function resetCache() {
  cachedConfig = null;
  fetchPromise = null;
}