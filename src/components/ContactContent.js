"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_URL =
  "https://wa.me/593959635406?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20The%20Best%20Sustainable%20Banana";

const INSTAGRAM_URL = "https://www.instagram.com/thebest_sustainablebanana";

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

export default function ContactContent() {
  return (
    <article className="bg-background">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center sm:px-8 sm:py-36">
        <FadeIn>
          <h1 className="font-display text-3xl font-bold tracking-tight text-olive-dark sm:text-4xl md:text-5xl">
            Contacto
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="mt-8 font-sans text-lg leading-relaxed text-foreground/80 sm:text-xl">
            Estamos aquí para responder tus preguntas sobre el proyecto, la
            producción sostenible y cómo podemos trabajar juntos. Escríbenos por
            WhatsApp y con gusto te atenderemos.
          </p>
        </FadeIn>

        <FadeIn delay={220}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#25D366] px-8 py-4 font-display text-sm font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#1ebe57] hover:gap-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.742.982a.5.5 0 01-.605-.605l.983-3.742-.214-.361A9.86 9.86 0 012.15 11.993C2.15 6.49 6.623 2.017 12.126 2.017c2.63 0 5.102 1.024 6.96 2.882a9.825 9.825 0 012.882 6.96c-.003 5.504-4.476 9.976-9.917 9.976M12.05 0C5.405 0 .057 5.347.057 11.992c0 2.11.55 4.167 1.595 5.982L0 24l6.205-1.627a11.95 11.95 0 005.84 1.486h.005c6.644 0 12.05-5.348 12.05-11.993C24.1 5.347 18.694 0 12.05 0" />
              </svg>
              WhatsApp
              <span className="font-sans text-xs font-normal normal-case tracking-normal opacity-90">
                +593 095 963 5406
              </span>
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-olive-dark px-8 py-4 font-display text-sm font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-brown-dark hover:gap-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 shrink-0"
                aria-hidden
              >
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
              </svg>
              Instagram
              <span className="font-sans text-xs font-normal normal-case tracking-normal opacity-90">
                @thebest_sustainablebanana
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
