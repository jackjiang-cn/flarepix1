"use client";

import { useState } from "react";
import Image from "next/image";
import { homepageVideos } from "@/config/homepage-videos";
import CtaButton from "./cta-button";
import Lightbox from "./lightbox";
import VideoDialogPlayer from "./video-dialog-player";

const brandFilm = homepageVideos.quickNBody;

export default function VideoSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="commercials-brand-films"
      aria-labelledby="commercials-brand-films-title"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--background)] py-20 sm:py-40"
    >
      <div className="relative mx-auto max-w-7xl">
        <button
          type="button"
          onClick={(event) => {
            event.currentTarget.focus({ preventScroll: true });
            setShowModal(true);
          }}
          aria-label="Play Commercials & Brand Films sample"
          aria-haspopup="dialog"
          className="group relative flex aspect-video w-full overflow-hidden bg-[#102820] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white lg:aspect-[21/9]"
        >
          <Image
            src={brandFilm.poster}
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035] lg:object-[center_82%]"
          />
          <span className="absolute inset-0 hidden bg-gradient-to-r from-[#102820]/92 via-[#102820]/56 via-38% to-transparent to-70% lg:block" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--amber)]/90 backdrop-blur transition-transform motion-safe:group-hover:scale-110 lg:h-24 lg:w-24">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#1b3b2f">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </span>
          </span>
        </button>

        <div className="mt-6 px-6 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:p-12 xl:p-16">
          <div className="w-full max-w-md">
            <p className="mb-3 text-sm font-medium text-[#896333] lg:text-[#cfb077]">
              Filmed Production
            </p>
            <h2 id="commercials-brand-films-title" className="text-3xl font-semibold tracking-tight lg:text-4xl lg:text-[#f4f2ec]">
              Commercials &amp; Brand Films
            </h2>
            <p className="mt-4 text-[var(--muted)] lg:text-lg lg:text-[#e2e6de]">
              From campaign commercials to launch films, we develop the idea,
              plan the shoot, and deliver edits for the channels in your brief.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <CtaButton href="/contact" className="min-h-12 w-full sm:w-auto lg:pointer-events-auto">
                Discuss a Project
              </CtaButton>
              <CtaButton href="/services/brand-film#brand-film-examples" variant="outline" className="min-h-12 w-full sm:w-auto lg:pointer-events-auto">
                Explore Brand Films
              </CtaButton>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={showModal}
        onClose={() => setShowModal(false)}
        label={brandFilm.title}
        closeLabel="Close video"
      >
        <VideoDialogPlayer {...brandFilm} />
      </Lightbox>
    </section>
  );
}
