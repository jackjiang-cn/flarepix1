import Link from "next/link";
import { homepageVideos } from "@/config/homepage-videos";
import ServiceVideoPreview from "./service-video-preview";

const featuredVideo = homepageVideos.aiToaster;

export default function AiShowcase() {
  return (
    <section
      id="ai-video-showcase"
      aria-labelledby="ai-video-showcase-title"
      className="scroll-mt-20 bg-[#17382d] text-[#f4f2ec]"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16">
        <div>
          <h2
            id="ai-video-showcase-title"
            className="text-4xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-5xl"
          >
            AI Video in Practice
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-[#d5ddd5] sm:text-lg">
            An AI-made product demo shows how to load bread, choose a setting on the touchscreen, and remove the crumb tray for cleaning.
          </p>
          <Link
            href="/services/ai-video#ai-video-examples"
            className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[#cfb077] text-sm font-semibold text-[#f4f2ec] transition-colors hover:text-[#cfb077] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            See More AI Videos <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ServiceVideoPreview key={featuredVideo.src} {...featuredVideo} />
      </div>
    </section>
  );
}
