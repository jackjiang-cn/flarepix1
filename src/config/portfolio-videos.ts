import { newPortfolioVideos } from "./new-portfolio-videos";

const videos = {
  "rgb-dj-tube-lights": ["RGB DJ Tube Lights", "electronics", "demonstration"],
  "outdoor-boots": ["Outdoor Boots", "fashion", "advertising"],
  "kids-basketball-hoop": ["Kids’ Basketball Hoop", "video-kids", "advertising"],
  "kids-step-stool": ["Kids’ Step Stool", "video-kids", "demonstration"],
  "baby-diaper-commercial": ["Baby Diaper Commercial", "video-kids", "advertising"],
  "infrared-thermometer": ["Infrared Thermometer", "video-kids", "demonstration"],
  "baby-care-organizer": ["Baby Care Organizer", "video-kids", "demonstration"],
  "bread-slicer": ["Bread Slicer", "home-kitchen", "demonstration"],
  "countertop-blender": ["Countertop Blender", "home-kitchen", "demonstration"],
  "multi-purpose-vacuum": ["Multi-Purpose Vacuum", "home-kitchen", "demonstration"],
  "hair-drying-towel-wrap": ["Hair Drying Towel Wrap", "home-kitchen", "demonstration"],
  "laundry-care-ad-seaside": ["Laundry Care Commercial – Seaside", "home-kitchen", "advertising"],
  "laundry-care-ad-lifestyle": ["Laundry Care Commercial – Lifestyle", "home-kitchen", "advertising"],
  "electric-kick-scooter": ["F7 Electric Kick Scooter", "video-sports", "demonstration"],
  "dk38ab-walking-pad": ["DK38AB Walking Pad", "video-sports", "demonstration"],
  "compact-treadmill": ["Compact Treadmill", "video-sports", "demonstration"],
  "dog-car-seat-cover": ["Dog Car Seat Cover", "pet-products", "demonstration"],
  "folding-mobility-scooter": ["Folding Mobility Scooter", "health-mobility", "demonstration"],
  "portable-mobility-scooter": ["Portable Mobility Scooter", "health-mobility", "demonstration"],
} as const;

const videoPath = (slug: string) => `/works/video/portfolio-2026-11/${slug}-v1.mp4`;

const catalog = Object.entries(videos).map(([slug, [title, category, type]]) => ({
  src: videoPath(slug),
  title,
  category,
  types: [type],
}));

export const portfolioVideoSource = (slug: keyof typeof videos) => videoPath(slug);

const productCatalog = [...newPortfolioVideos, ...catalog];

export const portfolioVideoSources = (category: string) =>
  productCatalog.filter((video) => video.category === category).map((video) => video.src);

export const portfolioVideoDetails = (src: string) =>
  productCatalog.find((video) => video.src === src);
