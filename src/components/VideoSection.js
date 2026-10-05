"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoSection() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const syncPlaying = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(!video.paused);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      setCurrent(video.currentTime);
      setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
    };
    const onMeta = () => setDuration(video.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const syncFullscreen = () => {
      const player = playerRef.current;
      const active =
        document.fullscreenElement === player ||
        document.webkitFullscreenElement === player;
      setFullscreen(Boolean(active));
    };

    document.addEventListener("fullscreenchange", syncFullscreen);
    document.addEventListener("webkitfullscreenchange", syncFullscreen);
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      document.removeEventListener("webkitfullscreenchange", syncFullscreen);
    };
  }, []);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch {
        /* autoplay policy / interrupted */
      }
    } else {
      video.pause();
    }
    syncPlaying();
  }, [syncPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player || !video) return;

    try {
      if (
        document.fullscreenElement === player ||
        document.webkitFullscreenElement === player
      ) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        return;
      }

      if (player.requestFullscreen) {
        await player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch {
      /* fullscreen denied / unavailable */
    }
  }, []);

  const seek = useCallback((event) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
  }, []);

  return (
    <section id="videos" className="scroll-mt-24 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <h2 className="mb-10 font-display text-3xl font-bold tracking-tight text-olive-dark sm:text-4xl md:mb-14">
            Videos
          </h2>
        </FadeIn>

        <FadeIn delay={120}>
          <div
            ref={playerRef}
            className={`relative w-full overflow-hidden bg-olive-dark ${
              fullscreen
                ? "h-svh max-h-none"
                : "aspect-video max-h-[70svh]"
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(playing ? false : true)}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain object-center"
              playsInline
              preload="metadata"
              poster="/videos/video-poster.jpg"
              onClick={togglePlay}
            >
              <source src="/videos/hero-banana.mp4" type="video/mp4" />
            </video>

            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Reproducir video"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/35"
              >
                <span className="flex h-16 w-16 items-center justify-center bg-olive-dark text-white shadow-lg sm:h-20 sm:w-20">
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-1 h-8 w-8 fill-current sm:h-9 sm:w-9"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}

            <div
              className={`absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-black/70 via-black/35 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 sm:px-5 ${
                showControls || !playing ? "opacity-100" : "opacity-0"
              }`}
            >
              <button
                type="button"
                aria-label="Buscar en el video"
                className="group relative mb-3 h-1.5 w-full cursor-pointer overflow-hidden bg-white/30"
                onClick={seek}
              >
                <span
                  className="absolute inset-y-0 left-0 bg-white transition-[width] duration-100 group-hover:bg-olive-light"
                  style={{ width: `${progress}%` }}
                />
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "Pausar" : "Reproducir"}
                  className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80"
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80"
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4V5.5a7 7 0 0 1 0 13V15a4.5 4.5 0 0 0 2.5-3z" />
                      <path d="M3 9v6h4l5 5V4L7 9H3z" />
                      <path d="M19.1 4.9 4.9 19.1l1.4 1.4L20.5 6.3z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />
                    </svg>
                  )}
                </button>

                <span className="ml-auto font-display text-xs tracking-wide text-white/90 sm:text-sm">
                  {formatTime(current)} / {formatTime(duration)}
                </span>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
                  className="flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-white/80"
                >
                  {fullscreen ? (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
