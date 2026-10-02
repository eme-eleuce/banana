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
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
        <FadeIn>
          <p className="font-sans text-lg leading-relaxed text-foreground/85 sm:text-xl md:text-2xl md:leading-relaxed">
            The Best Sustainable Banana es un proyecto de agroforestería en
            Ecuador que transforma la bananera tradicional en un bosque
            productivo. Dejamos atrás el monocultivo para crear un sistema vivo,
            donde el banano orgánico crece bajo sombra, junto a árboles nativos,
            cacao y especies que regeneran el suelo.
          </p>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mt-12 font-display text-2xl font-medium leading-snug text-olive-dark sm:text-3xl md:text-4xl">
            Menos huella. Más vida.
          </p>
          <p className="mt-4 font-sans text-base text-foreground/75 sm:text-lg">
            Así producimos el banano más sostenible del mundo.
          </p>
          <p className="mt-8 font-display text-sm font-medium uppercase tracking-[0.3em] text-brown">
            Forest Grown. Carbon Conscious.
          </p>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="relative mx-auto mt-12 h-36 w-52 sm:h-44 sm:w-64">
            <Image
              src="/logos/Recurso%201.png"
              alt="The Best Sustainable Banana"
              fill
              className="object-contain"
              sizes="256px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={360}>
          <Link
            href="/proyecto"
            className="group mt-12 inline-flex items-center gap-3 bg-olive-dark px-8 py-4 font-display text-sm font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-brown-dark hover:gap-4"
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
