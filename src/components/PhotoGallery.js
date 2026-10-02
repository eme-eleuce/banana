"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const photos = [
  {
    src: "/images/AFL04613_Metraje_Bananera%20Cluzon_15%20Sep%202026_R2.jpg",
    alt: "Trabajador caminando entre filas de banano con fundas protectoras",
  },
  {
    src: "/images/AFL04305_Metraje_Bananera%20Cluzon_15%20Sep%202026_R2.jpg",
    alt: "Lagartija entre la vegetación de la bananera",
  },
  {
    src: "/images/IMG_2430_Metraje_Bananera%20Cluzon_15%20Sep%202026_RP.jpg",
    alt: "Periquitos en la bananera, muestra de biodiversidad",
  },
  {
    src: "/images/IMG_1991_Metraje_Bananera%20Cluzon_Guayas_AFilms_10%20Septiembre%202026_R.jpg",
    alt: "Transferencia de conocimiento en el campo",
  },
  {
    src: "/images/IMG_2807_Metraje_Bananera%20Cluzon_15%20Sep%202026_RP.jpg",
    alt: "Mariposa en la vegetación del proyecto",
  },
  {
    src: "/images/DSC04511_Metraje_Bananera%20Cluzon_Guayas_AFilms_10%20Septiembre%202026_300.jpg",
    alt: "Hoja de banano con gotas de agua",
  },
  {
    src: "/images/4U7A8093_Metraje_Bananera%20Cluzon_15%20Sep%202026_5DSR.jpg",
    alt: "Racimos de banano verde en proceso de lavado",
  },
  {
    src: "/images/DJI_20260910082729_0161_D.jpg",
    alt: "Vista aérea de la plantación de banano",
  },
];

export default function PhotoGallery() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % photos.length);
    }, 2000);

    return () => clearInterval(id);
  }, [paused]);

  const select = useCallback((index) => {
    setActive(index);
  }, []);

  return (
    <section id="fotos" className="scroll-mt-24 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 className="font-display text-3xl font-bold tracking-tight text-olive-dark sm:text-4xl">
            Galería de fotos
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-foreground/75 sm:text-lg">
            Biodiversidad, trabajo en campo y el día a día de la bananera
            sostenible.
          </p>
        </div>

        <div
          className="relative h-[min(72svh,44rem)] w-full overflow-hidden bg-olive-dark/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover object-center"
                sizes="100vw"
                preload={index === 0}
              />
            </div>
          ))}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brown-dark/50 to-transparent px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Ver foto ${index + 1}`}
                  onClick={() => select(index)}
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    index === active ? "bg-white" : "bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
          {photos.map((photo, index) => (
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
              aria-label={photo.alt}
              aria-current={index === active}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
