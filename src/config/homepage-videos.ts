import { industryVideos } from "./cdn";
import { newPortfolioVideo } from "./new-portfolio-videos";

function withPoster(slug: Parameters<typeof newPortfolioVideo>[0], poster: string) {
  const { title, src } = newPortfolioVideo(slug);
  return { title, src, poster };
}

export const homepageVideos = {
  boardGameTable: withPoster("modular-board-game-table", "/media/home-modular-board-game-table-v1.webp"),
  donnerDrums: withPoster("donner-electronic-drum-kit", "/media/home-donner-electronic-drum-kit-v1.webp"),
  petWaterFountain: withPoster("cordless-pet-water-fountain", "/media/home-pet-water-fountain-v1.webp"),
  momcozyD8: {
    title: "Momcozy D8 Baby Bottle Washer",
    src: industryVideos.smallAppliances,
    poster: "/media/home-momcozy-d8-v1.webp",
  },
  degaiaMenswear: withPoster("degaia-menswear", "/media/home-degaia-menswear-v1.webp"),
  robotDog: withPoster("companion-robot-dog", "/media/home-companion-robot-dog-v1.webp"),
  quickNBody: {
    title: "Quick N Body Fitness Commercial",
    src: "/works/brand-film/brand-film-07.m4v",
    poster: "/home-commercials-brand-films-v2.webp",
    hlsSrc: "/media/quick-n-body/v1/master.m3u8",
  },
  aiToaster: withPoster("ai-long-slot-touchscreen-toaster", "/media/home-ai-touchscreen-toaster-v1.webp"),
} as const;
