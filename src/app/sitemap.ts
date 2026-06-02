import type { MetadataRoute } from "next";
import { blogPosts } from "@/config/blog-posts";
import {
  photoCategories,
  videoProductionCategories,
} from "@/config/categories";

const BASE = "https://flarepix.com";
const TODAY = new Date().toISOString().split("T")[0];

type Entry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastModified?: string;
};

const staticPages: Entry[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "services", priority: 0.9, changeFrequency: "monthly" },
  { path: "services/ai-imagery", priority: 0.8, changeFrequency: "monthly" },
  { path: "services/ai-video", priority: 0.8, changeFrequency: "monthly" },
  { path: "services/brand-film", priority: 0.8, changeFrequency: "monthly" },
  { path: "work", priority: 0.9, changeFrequency: "weekly" },
  { path: "pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "ai-tools", priority: 0.8, changeFrequency: "monthly" },
];

const photoServicePages: Entry[] = photoCategories.map((c) => ({
  path: `services/${c.slug}`,
  priority: 0.8,
  changeFrequency: "monthly",
}));

const videoServicePages: Entry[] = videoProductionCategories.map((c) => ({
  path: `services/${c.slug}`,
  priority: 0.8,
  changeFrequency: "monthly",
}));

const blogPages: Entry[] = blogPosts.map((p) => ({
  path: `blog/${p.slug}`,
  priority: 0.6,
  changeFrequency: "monthly",
  lastModified: p.date,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const all = [
    ...staticPages,
    ...photoServicePages,
    ...videoServicePages,
    ...blogPages,
  ];
  return all.map((e) => ({
    url: `${BASE}/${e.path}`,
    lastModified: e.lastModified || TODAY,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
