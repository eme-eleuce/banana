"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { photos } from "@/data/photos";

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
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function FotosGallery() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  const showPrev = useCallback(() => {
    setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
  }, []);

  const showNext = useCallback(() => {
    setActive((i) => (i === null ? i : (i + 1) % photos.length));
  }, []);

  useEffect(() => {
    if (active === null) return;

    function onKey(event) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, showPrev, showNext]);

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="text-center font-display text-3xl font-bold tracking-tight text-olive-dark sm:text-4xl md:text-5xl">
          Fotos
        </h1>

        <div className="mt-12 grid grid-cols-3 gap-1.5 sm:gap-4 md:gap-5">
          {photos.map((photo, index) => (
            <FadeIn
              key={photo.src}
              delay={(index % 6) * 60}
              className="min-w-0"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group relative block aspect-square w-full overflow-hidden bg-olive-dark/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive sm:aspect-[4/5]"
                aria-label={`Ampliar foto ${index + 1}`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 33vw, 33vw"
                />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${active + 1}`}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 font-display text-sm uppercase tracking-[0.2em] text-white/80 hover:text-white sm:right-8 sm:top-8"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Foto anterior"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 px-3 py-4 text-white/80 hover:text-white sm:left-6"
          >
            ←
          </button>

          <div
            className="relative max-h-[85svh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[active].src}
              alt=""
              width={1920}
              height={1280}
              className="max-h-[85svh] w-auto object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 px-3 py-4 text-white/80 hover:text-white sm:right-6"
          >
            →
          </button>
        </div>
      )}
    </section>
  );
}
