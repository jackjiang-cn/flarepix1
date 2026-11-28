"use client";

import { useEffect, useRef, useState } from "react";

const showreel = "/media/home-showreel-v6.mp4";
const poster = "/media/home-showreel-v6.webp";

export default function HeroShowreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const autoplay = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    if (autoplay.matches) void video.play().catch(() => {});

    const pauseWhenAutoplayDisabled = () => {
      if (!autoplay.matches) video.pause();
    };
    autoplay.addEventListener("change", pauseWhenAutoplayDisabled);
    return () => autoplay.removeEventListener("change", pauseWhenAutoplayDisabled);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      if (failed) video.load();
      setFailed(false);
      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });
    } else {
      video.pause();
    }
  }

  return (
    <figure>
      <div className="relative isolate overflow-hidden rounded-lg bg-[#182720] ring-1 ring-foreground/10">
        <video
          ref={videoRef}
          src={showreel}
          poster={poster}
          aria-label="FlarePix showreel"
          className="block aspect-video w-full object-cover"
          playsInline
          loop
          muted
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setFailed(true);
          }}
        />
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Pause showreel" : "Play showreel"}
          className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-white/55 bg-[#10241c]/85 text-white transition-colors hover:bg-[#10241c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-4 sm:right-4"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            {playing ? <path d="M7 5h3v14H7zm7 0h3v14h-3z" /> : <path d="m9 5 11 7-11 7z" />}
          </svg>
        </button>
      </div>
      <figcaption className="flex items-start justify-between gap-3 border-b border-foreground/15 pb-3 pt-3 text-sm">
        <span className="font-semibold text-foreground">FlarePix showreel</span>
        <span role="status" className="text-right text-muted">{failed ? "Playback unavailable. Try again." : "11 sec"}</span>
      </figcaption>
    </figure>
  );
}
