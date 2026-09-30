"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PLANTING_IMAGE =
  "/images/DSC04710_Metraje_Bananera%20Cluzon_Guayas_AFilms_10%20Septiembre%202026_300.JPG";

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

export default function ProyectoContent() {
  return (
    <article className="relative overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(92,110,47,0.12), transparent 42%), radial-gradient(circle at 88% 72%, rgba(92,58,42,0.08), transparent 40%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 pt-32 sm:px-8 sm:pt-36">
        <FadeIn>
          <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.25em] text-olive">
            Proyecto
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-olive-dark sm:text-4xl md:text-5xl">
            The Best Sustainable Banana: agricultura que reforesta
          </h1>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-8 font-display text-xl font-medium leading-snug text-brown sm:text-2xl md:text-3xl">
            No deforestamos para cultivar. Reforestamos para cultivar.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="my-10 h-px w-16 bg-olive/40" />
        </FadeIn>

        <FadeIn>
          <p className="pb-16 text-lg leading-relaxed text-foreground/85 sm:text-xl md:pb-20">
            The Best Sustainable Banana es un proyecto de agroforestería en
            Ecuador que transforma la bananera tradicional en un bosque
            productivo. Dejamos atrás el monocultivo para crear un sistema vivo,
            donde el banano orgánico crece bajo sombra, junto a árboles nativos,
            cacao y especies que regeneran el suelo.
          </p>
        </FadeIn>
      </div>

      <section className="relative mx-auto my-8 w-full md:my-12 md:max-w-5xl md:px-8">
        <div className="relative overflow-hidden md:grid md:grid-cols-2 md:items-stretch">
          <div className="relative aspect-[3/4] w-full overflow-hidden md:min-h-[560px] md:aspect-auto">
            <Image
              src={PLANTING_IMAGE}
              alt="Hombre sosteniendo una planta de banano lista para sembrar"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            {/* Mobile: text overlay on top of image */}
            <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-brown-dark/90 via-brown-dark/55 to-transparent px-5 pb-16 pt-8 md:hidden">
              <FadeIn>
                <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.25em] text-olive-light">
                  Reforestación
                </p>
              </FadeIn>
              <FadeIn delay={150}>
                <p className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                  Cada hectárea que sembramos es una hectárea que restaura.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Desktop: text panel beside image */}
          <div className="hidden flex-col justify-center bg-brown-dark px-12 py-14 md:flex">
            <FadeIn>
              <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.25em] text-olive-light">
                Reforestación
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="font-display text-3xl font-medium leading-snug text-white lg:text-4xl">
                Cada hectárea que sembramos es una hectárea que restaura.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="relative mx-auto max-w-3xl px-6 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-20">
        <FadeIn>
          <p className="text-lg leading-relaxed text-foreground/85 sm:text-xl">
            A diferencia de la agricultura convencional, nuestro modelo captura
            carbono en lugar de emitirlo. Los árboles que integramos funcionan
            como sumideros naturales de CO2, la biomasa en el suelo retiene
            carbono y eliminamos el uso de fertilizantes sintéticos y químicos,
            que son una de las principales fuentes de emisiones en la
            industria.
          </p>
        </FadeIn>

        <FadeIn delay={80}>
          <p className="mt-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
            El resultado es un sistema que reduce drásticamente la huella de
            carbono del banano, desde la finca hasta el puerto.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="mt-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
            Producimos un banano 100% orgánico, trazable y resiliente, cultivado
            en un ecosistema que protege la biodiversidad, regenera la tierra y
            dignifica al agricultor.
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-16 rounded-sm bg-olive-dark px-8 py-12 text-center sm:px-12">
            <p className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
              Menos huella. Más vida.
            </p>
            <p className="mt-3 font-sans text-base text-white/80 sm:text-lg">
              Así producimos el banano más sostenible del mundo.
            </p>
            <p className="mt-8 font-display text-sm font-medium uppercase tracking-[0.3em] text-olive-light">
              Forest Grown. Carbon Conscious.
            </p>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
