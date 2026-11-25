"use client";

import { useRef, useState } from "react";
import { cdnUrl, resolvePosterUrl } from "@/config/cdn";

type Props = {
  title: string;
  src: string;
  poster: string;
};

type PlaybackState = "idle" | "loading" | "playing" | "error";

export default function ServiceVideoPreview({ title, src, poster }: Props) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackAttempt = useRef(0);
  const posterUrl = resolvePosterUrl(poster);
  const loading = playbackState === "loading";
  const failed = playbackState === "error";
  const statusMessage = loading ? "Loading preview…" : failed ? "This preview couldn’t load." : "";

  function showPlaybackError() {
    // A source error can occur before the browser settles the play promise.
    playbackAttempt.current += 1;
    setPlaybackState("error");
  }

  function startPlayback() {
    const video = videoRef.current;
    if (!video || loading) return;

    const attempt = ++playbackAttempt.current;
    setPlaybackState("loading");
    if (failed) video.load();

    void video.play()
      .then(() => {
        if (attempt === playbackAttempt.current) setPlaybackState("playing");
      })
      .catch(() => {
        if (attempt === playbackAttempt.current) showPlaybackError();
      });
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md bg-[#d8d6cc]">
      <video
        ref={videoRef}
        aria-label={`${title} video preview`}
        controls={playbackState === "playing"}
        playsInline
        preload="none"
        poster={posterUrl}
        onError={showPlaybackError}
        className={`h-full w-full bg-black ${playbackState === "playing" ? "object-contain" : "object-cover"}`}
      >
        <source src={cdnUrl(src)} type="video/mp4" onError={showPlaybackError} />
        Your browser does not support video playback.
      </video>
      <p role="status" className="sr-only">{statusMessage}</p>
      {playbackState !== "playing" && (
        <button
          type="button"
          onClick={startPlayback}
          aria-label={failed ? `Try again: ${title} video preview` : `Play ${title} video preview`}
          aria-disabled={loading}
          className="group absolute inset-0 block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          {statusMessage ? (
            <span
              className="absolute inset-0 grid place-content-center gap-2 bg-cover bg-center px-4 text-center text-white"
              style={{ backgroundImage: `linear-gradient(rgb(16 40 32 / 82%), rgb(16 40 32 / 82%)), url(${JSON.stringify(posterUrl)})` }}
              aria-hidden="true"
            >
              <span className="text-sm font-medium">{statusMessage}</span>
              {failed && (
                <span className="mx-auto inline-flex min-h-10 items-center rounded border border-white/70 px-4 text-sm font-semibold transition-colors group-hover:bg-white group-hover:text-[#102820]">
                  Try again
                </span>
              )}
            </span>
          ) : (
            <>
              <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-black/30 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[var(--foreground)]" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5"><path d="m8 5 11 7-11 7V5Z" /></svg>
              </span>
              <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white" aria-hidden="true">Video preview</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
