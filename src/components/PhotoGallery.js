"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { homePhotos } from "@/data/photos";

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

export default function PhotoGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % homePhotos.length);
    }, 2000);

    return () => clearInterval(id);
  }, [paused]);

  const select = useCallback((index) => {
    setActive(index);
  }, []);

  return (
    <section className="bg-background py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
            <h2 className="font-display text-3xl font-bold tracking-tight text-olive-dark sm:text-4xl">
              Galería de fotos
            </h2>
            <Link
              href="/fotos"
              className="font-display text-sm font-medium uppercase tracking-[0.2em] text-olive-dark transition-colors hover:text-brown"
            >
              Ver todas →
            </Link>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div
            className="relative aspect-video w-full max-h-[70svh] overflow-hidden bg-olive-dark/5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {homePhotos.map((photo, index) => (
              <div
                key={photo.src}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  preload={index === 0}
                />
              </div>
            ))}

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background/80 to-transparent px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex gap-2">
                {homePhotos.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Ver foto ${index + 1}`}
                    onClick={() => select(index)}
                    className={`h-1 flex-1 transition-colors duration-300 ${
                      index === active
                        ? "bg-olive-dark"
                        : "bg-olive/30 hover:bg-olive/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
            {homePhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => select(index)}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className={`relative aspect-video overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-olive ${
                  index === active
                    ? "ring-2 ring-olive ring-offset-2 ring-offset-background"
                    : "opacity-70 hover:opacity-100"
                }`}
                aria-label={`Ver foto ${index + 1}`}
                aria-current={index === active}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
