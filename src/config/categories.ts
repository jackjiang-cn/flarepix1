import { industryVideos } from "./cdn";
import { portfolioVideoSource, portfolioVideoSources } from "./portfolio-videos";

export type CategoryType = "video" | "photo";

export type Category = {
  slug: string;
  label: string;
  description: string;
  type: CategoryType;
};

export const legacyOtherVideoCategory = "video-others";

export const videoProductionCategories: Category[] = [
  {
    slug: "home-kitchen",
    label: "Home & Kitchen",
    type: "video",
    description: "Product videos for home goods, cookware, furniture, cleaning equipment, and kitchen appliances.",
  },
  {
    slug: "video-kids",
    label: "Baby & Kids",
    type: "video",
    description: "Product videos for baby care, strollers, children's apparel, and toys.",
  },
  {
    slug: "electronics",
    label: "Electronics & Tech",
    type: "video",
    description: "Product videos for consumer electronics, smart devices, software, and technology equipment.",
  },
  {
    slug: "video-sports",
    label: "Sports & Outdoors",
    type: "video",
    description: "Product videos for fitness equipment, cycling, and outdoor gear.",
  },
  {
    slug: "fashion",
    label: "Fashion & Apparel",
    type: "video",
    description: "Fashion and clothing product videos.",
  },
  {
    slug: "pet-products",
    label: "Pet Products",
    type: "video",
    description: "Product videos for pet care, feeding, travel, and home accessories.",
  },
  {
    slug: "health-mobility",
    label: "Health & Mobility",
    type: "video",
    description: "Product videos for personal health devices, ergonomic support, and mobility aids.",
  },
];

export const videoProductionSources: Record<string, string[]> = {
  "home-kitchen": [
    ...portfolioVideoSources("home-kitchen"),
    "/works/video/Fashion & Apparel/product-video-01.mp4",
    "/works/video/Others/product-video-13.m4v",
    "/works/ai/videos/ai-video-01.mp4",
    "/works/ai/videos/ai-video-02.mp4",
    "/works/ai/videos/ai-video-03.mp4",
  ],
  "video-kids": [
    ...portfolioVideoSources("video-kids"),
    industryVideos.smallAppliances,
    "/works/video/Kids & Toys/product-video-03.mp4",
    industryVideos.fashionApparel,
    "/works/video/Kids & Toys/product-video-11.mp4",
    "/works/video/Kids & Toys/product-video-12.m4v",
    "/works/video/Kids & Toys/product-video-13.m4v",
    "/works/video/Kids & Toys/product-video-14.m4v",
    "/works/video/Kids & Toys/product-video-15.m4v",
    "/works/video/Home & Kitchen/product-video-03.m4v",
  ],
  electronics: portfolioVideoSources("electronics"),
  "video-sports": [
    ...portfolioVideoSources("video-sports"),
    "/works/video/Sports & Fitness/product-video-08.m4v",
    "/works/video/Sports & Fitness/product-video-07.m4v",
    "/works/video/Sports & Fitness/product-video-04.mp4",
    "/works/video/Sports & Fitness/product-video-05.m4v",
    "/works/video/Sports & Fitness/product-video-06.m4v",
  ],
  fashion: [
    ...portfolioVideoSources("fashion"),
    industryVideos.fashionApparel,
  ],
  "pet-products": [
    ...portfolioVideoSources("pet-products"),
    "/works/video/Others/product-video-09.mp4",
  ],
  "health-mobility": [
    ...portfolioVideoSources("health-mobility"),
    "/works/video/Electronics/product-video-09.m4v",
    "/works/video/Electronics/product-video-10.m4v",
    "/works/video/Electronics/product-video-06.mp4",
    "/works/video/Electronics/product-video-05.mp4",
    portfolioVideoSource("infrared-thermometer"),
    "/works/ai/videos/ai-video-04.mp4",
  ],
};

export const videoCategories: Category[] = [
  {
    slug: "womens-clothing",
    label: "Women's Fashion",
    type: "video",
    description:
      "Women's apparel and fashion product videos. On-model demonstrations, styling showcases, and lifestyle content for clothing brands.",
  },
  {
    slug: "mens",
    label: "Men's Fashion",
    type: "video",
    description:
      "Men's clothing and accessories product videos. Style demonstrations and lifestyle content for menswear brands.",
  },
  {
    slug: "kids",
    label: "Kids & Toys",
    type: "video",
    description:
      "Children's products and toys videos. Fun, engaging content that showcases features and benefits for parents and kids.",
  },
  {
    slug: "accessories",
    label: "Accessories",
    type: "video",
    description:
      "Fashion accessories and jewelry product videos. Detail shots, styling suggestions, and brand storytelling content.",
  },
  {
    slug: "products",
    label: "General Products",
    type: "video",
    description:
      "Product videos for electronics, home goods, and general merchandise. Clean presentations and feature demonstrations.",
  },
  {
    slug: "other",
    label: "Home & Lifestyle",
    type: "video",
    description:
      "Home goods, lifestyle products, and everyday items. Lifestyle content and functional showcases.",
  },
];

export const photoCategories: Category[] = [
  {
    slug: "womens-fashion",
    label: "Women's Fashion",
    type: "photo",
    description:
      "Women's apparel photography including dresses, tops, and outerwear. On-model and flat lay presentations with consistent styling.",
  },
  {
    slug: "mens",
    label: "Men's Fashion",
    type: "photo",
    description:
      "Men's clothing and apparel photography. On-model shots and lifestyle content for menswear brands and retailers.",
  },
  {
    slug: "kids",
    label: "Kids & Toys",
    type: "photo",
    description:
      "Children's products and toys photography. Colorful, engaging visuals perfect for ecommerce and marketing.",
  },
  {
    slug: "accessories",
    label: "Accessories",
    type: "photo",
    description:
      "Fashion accessories including jewelry, bags, watches, and more. Detail-focused shots and styled presentations.",
  },
  {
    slug: "products",
    label: "Products",
    type: "photo",
    description:
      "General product photography for electronics, home goods, and various merchandise categories.",
  },
  {
    slug: "other",
    label: "Home & Lifestyle",
    type: "photo",
    description:
      "Home goods, lifestyle products, and everyday items. Lifestyle and contextual product photography.",
  },
  {
    slug: "womens-underwear",
    label: "Women's Underwear",
    type: "photo",
    description:
      "Intimate apparel photography for women's underwear and loungewear. Professional presentations with brand-appropriate styling.",
  },
  {
    slug: "sports",
    label: "Sports",
    type: "photo",
    description:
      "Sports equipment and athletic gear photography. Action shots and lifestyle content for fitness brands.",
  },
  {
    slug: "others",
    label: "Others",
    type: "photo",
    description:
      "General product photography for various categories not listed above. Clean presentations for diverse merchandise.",
  },
];

export const allCategories: Category[] = [
  ...photoCategories,
  {
    slug: "electronics",
    label: "Electronics",
    type: "video",
    description: "Product videos for electronics and tech gadgets.",
  },
  {
    slug: "fashion",
    label: "Fashion & Apparel",
    type: "video",
    description: "Fashion and clothing product videos.",
  },
  {
    slug: "kids",
    label: "Kids & Toys",
    type: "video",
    description: "Children's products and toys videos.",
  },
  {
    slug: "home-kitchen",
    label: "Home & Kitchen",
    type: "video",
    description: "Home goods and kitchen product videos.",
  },
  {
    slug: "sports",
    label: "Sports & Fitness",
    type: "video",
    description: "Sports equipment and fitness product videos.",
  },
  {
    slug: "others",
    label: "Others",
    type: "video",
    description: "Product videos for general merchandise and other categories.",
  },
];
