"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import { cdnUrl, resolvePosterUrl } from "@/config/cdn";

type Props = {
  src: string;
  hlsSrc?: string;
  poster: string;
  title: string;
};

export default function VideoDialogPlayer({ src, hlsSrc, poster, title }: Props) {
  const playerRef = useRef<HTMLVideoElement>(null);
  const hlsFallbackRef = useRef<(() => void) | null>(null);
  const [playbackState, setPlaybackState] = useState<"loading" | "ready" | "error">("loading");
  const posterUrl = resolvePosterUrl(poster);
  const failed = playbackState === "error";
  const message = failed ? "This preview couldn’t load." : playbackState === "loading" ? "Loading preview…" : "";

  useEffect(() => {
    const video = playerRef.current;
    if (!video || !hlsSrc) return;

    let disposed = false;
    let hls: Hls | undefined;

    function switchToMp4() {
      if (disposed || hlsFallbackRef.current !== switchToMp4 || !video) return;
      hlsFallbackRef.current = null;

      const playbackTime = video.currentTime;
      hls?.destroy();
      hls = undefined;
      setPlaybackState("loading");
      video.src = cdnUrl(src);
      if (playbackTime > 0) video.currentTime = playbackTime;
    }

    hlsFallbackRef.current = switchToMp4;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSrc;
    } else {
      void import("hls.js").then(({ default: HlsPlayer }) => {
        if (disposed || hlsFallbackRef.current !== switchToMp4) return;
        if (!HlsPlayer.isSupported()) {
          switchToMp4();
          return;
        }

        hls = new HlsPlayer();
        hls.on(HlsPlayer.Events.ERROR, (_event, error) => {
          if (error.fatal) switchToMp4();
        });
        hls.loadSource(hlsSrc);
        hls.attachMedia(video);
      }).catch(switchToMp4);
    }

    return () => {
      disposed = true;
      hlsFallbackRef.current = null;
      hls?.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [hlsSrc, src]);

  function showPlaybackError() {
    const switchToMp4 = hlsFallbackRef.current;
    if (switchToMp4) {
      switchToMp4();
      return;
    }
    setPlaybackState("error");
  }

  function retry() {
    const player = playerRef.current;
    if (!player) return;

    setPlaybackState("loading");
    player.load();
    player.focus();
    void player.play().catch((error: unknown) => {
      if (error instanceof DOMException && (error.name === "AbortError" || error.name === "NotAllowedError")) return;
      showPlaybackError();
    });
  }

  return (
    <div className="w-full max-w-[1100px] overflow-hidden rounded-lg bg-[#102820]">
      <p className="px-4 py-3 text-sm font-medium">{title}</p>
      <div className="relative">
        <video
          ref={playerRef}
          aria-label={title + " video"}
          tabIndex={0}
          controls={!failed}
          autoPlay
          playsInline
          preload="metadata"
          poster={posterUrl}
          onCanPlay={() => setPlaybackState((state) => state === "loading" ? "ready" : state)}
          onError={showPlaybackError}
          className="block aspect-video max-h-[76dvh] w-full bg-black object-contain"
        >
          {!hlsSrc && <source src={cdnUrl(src)} type="video/mp4" onError={showPlaybackError} />}
          Your browser does not support video playback.
        </video>
        {failed && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `linear-gradient(rgb(16 40 32 / 82%), rgb(16 40 32 / 82%)), url(${JSON.stringify(posterUrl)})` }}
          />
        )}
        <div className="pointer-events-none absolute inset-0 grid place-items-center p-4 text-center text-white">
          <div className="flex flex-col items-center gap-2">
            <p role="status" className={message ? "rounded bg-[#102820]/90 px-3 py-2 text-sm font-medium" : "sr-only"}>{message}</p>
            {failed && (
              <button
                type="button"
                onClick={retry}
                className="pointer-events-auto inline-flex min-h-10 items-center rounded border border-white/70 bg-[#102820] px-4 text-sm font-semibold hover:bg-white hover:text-[#102820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
