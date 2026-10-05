"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" },
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

export default function Intro() {
  return (
    <section id="intro" className="scroll-mt-24 bg-background">
      <div className="mx-auto max-w-3xl px-6 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-14">
        <FadeIn className="text-center">
          <div className="relative mx-auto h-32 w-48 sm:h-40 sm:w-56">
            <Image
              src="/logos/Recurso%201.png"
              alt="The Best Sustainable Banana"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 192px, 224px"
              priority
            />
          </div>
        </FadeIn>

        <FadeIn delay={120} className="mt-10 text-center">
          <h2 className="font-display text-3xl font-bold leading-snug tracking-tight text-olive-dark sm:text-4xl md:text-5xl">
            Menos huella. Más vida.
          </h2>
          <p className="mt-4 font-sans text-base text-foreground/75 sm:text-lg">
            Así producimos el banano más sostenible del mundo.
          </p>
          <p className="mt-8 inline-block border border-brown/35 px-5 py-2.5 font-display text-xs font-medium uppercase tracking-[0.25em] text-brown sm:text-sm">
            Forest Grown. Carbon Conscious.
          </p>
        </FadeIn>

        <FadeIn delay={200} className="mt-10 flex justify-center">
          <div className="h-px w-16 bg-olive/60" aria-hidden />
        </FadeIn>

        <FadeIn delay={280}>
          <div className="mx-auto mt-10 max-w-prose space-y-5 text-justify font-sans text-base leading-relaxed text-foreground/85 sm:text-lg sm:leading-relaxed">
            <p>
              The Best Sustainable Banana es un proyecto de agroforestería en
              Ecuador que transforma la bananera tradicional en un bosque
              productivo.
            </p>
            <p>
              Dejamos atrás el monocultivo para crear un sistema vivo, donde el
              banano orgánico crece bajo sombra, junto a árboles nativos, cacao y
              especies que regeneran el suelo.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={360} className="mt-12 text-center">
          <Link
            href="/proyecto"
            className="group inline-flex items-center gap-3 bg-olive-dark px-8 py-4 font-display text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-brown-dark hover:gap-4"
          >
            Más información del proyecto
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            >
              →
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
