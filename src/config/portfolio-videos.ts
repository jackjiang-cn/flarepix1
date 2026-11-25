const videos = {
  "rgb-dj-tube-lights": ["RGB DJ Tube Lights", "electronics"],
  "outdoor-boots": ["Outdoor Boots", "fashion"],
  "kids-basketball-hoop": ["Kids’ Basketball Hoop", "video-kids"],
  "kids-step-stool": ["Kids’ Step Stool", "video-kids"],
  "baby-diaper-commercial": ["Baby Diaper Commercial", "video-kids"],
  "infrared-thermometer": ["Infrared Thermometer", "video-kids"],
  "baby-care-organizer": ["Baby Care Organizer", "video-kids"],
  "bread-slicer": ["Bread Slicer", "home-kitchen"],
  "countertop-blender": ["Countertop Blender", "home-kitchen"],
  "multi-purpose-vacuum": ["Multi-Purpose Vacuum", "home-kitchen"],
  "hair-drying-towel-wrap": ["Hair Drying Towel Wrap", "home-kitchen"],
  "laundry-care-ad-seaside": ["Laundry Care Commercial – Seaside", "home-kitchen"],
  "laundry-care-ad-lifestyle": ["Laundry Care Commercial – Lifestyle", "home-kitchen"],
  "electric-kick-scooter": ["F7 Electric Kick Scooter", "video-sports"],
  "dk38ab-walking-pad": ["DK38AB Walking Pad", "video-sports"],
  "compact-treadmill": ["Compact Treadmill", "video-sports"],
  "dog-car-seat-cover": ["Dog Car Seat Cover", "video-others"],
  "folding-mobility-scooter": ["Folding Mobility Scooter", "video-others"],
  "portable-mobility-scooter": ["Portable Mobility Scooter", "video-others"],
} as const;

const videoPath = (slug: string) => `/works/video/portfolio-2026-11/${slug}-v1.mp4`;

const catalog = Object.entries(videos).map(([slug, [title, category]]) => ({
  src: videoPath(slug),
  title,
  category,
}));

export const portfolioVideo = (slug: keyof typeof videos) => ({
  src: videoPath(slug),
  title: videos[slug][0],
});

export const portfolioVideoSources = (category: string) =>
  catalog.filter((video) => video.category === category).map((video) => video.src);

export const portfolioVideoTitle = (src: string) =>
  catalog.find((video) => video.src === src)?.title;
