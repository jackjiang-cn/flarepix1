import Link from "next/link";
import ServiceVideoPreview from "./service-video-preview";
import { posterFor } from "@/config/cdn";

const featuredVideo = "/works/ai/videos/ai-video-01.mp4";

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
            A wide apartment scene gives way to close-ups of a balcony door handle in use.
          </p>
          <Link
            href="/services/ai-video"
            className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[#cfb077] text-sm font-semibold text-[#f4f2ec] transition-colors hover:text-[#cfb077] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            See More AI Videos <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <ServiceVideoPreview
          title="AI balcony door scene"
          src={featuredVideo}
          poster={posterFor(featuredVideo)}
        />
      </div>
    </section>
  );
}
