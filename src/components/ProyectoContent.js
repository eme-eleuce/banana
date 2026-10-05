"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PLANTING_IMAGE =
  "/images/DSC04710_Metraje_Bananera%20Cluzon_Guayas_AFilms_10%20Septiembre%202026_300.JPG";

const WORKER_IMAGE =
  "/images/4U7A8025_Metraje_Bananera%20Cluzon_15%20Sep%202026_5DSR%20(1).jpg";

const percentStats = [
  {
    percent: 26.2,
    label: "Participación en el mercado mundial de banano",
  },
  {
    percent: 12.7,
    label: "De los cultivos permanentes del país",
  },
];

const employmentStats = [
  {
    target: 200000,
    label: "Empleos directos aproximadamente",
    format: (n) => Math.round(n).toLocaleString("es-EC"),
  },
  {
    target: 2,
    label: "Empleos indirectos en la cadena",
    format: (n) => `+${n.toFixed(n >= 2 ? 0 : 1)}M`,
  },
];

const componentes = [
  "Implementación de la metodología Poverty Stoplight con los beneficiarios del proyecto.",
  "Implementación del sistema agroforestal en banano.",
  "Proceso de transferencia de conocimiento.",
];

function useInView(threshold = 0.25) {
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
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function useCountUp(target, active, duration = 1600, decimals = 0) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, decimals]);

  return value;
}

function FadeIn({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();

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

function DonutChart({ percent, label, delay = 0 }) {
  const [ref, visible] = useInView(0.3);
  const animated = useCountUp(percent, visible, 1600);
  const size = 280;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="relative h-[200px] w-[200px] md:h-[280px] md:w-[280px]">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-full w-full -rotate-90"
          aria-hidden
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-olive/15"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-olive"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl font-bold text-olive md:text-5xl lg:text-6xl">
            {animated.toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="mt-5 max-w-[14rem] font-sans text-base leading-snug text-brown sm:text-lg md:max-w-[18rem] md:text-xl">
        {label}
      </p>
    </div>
  );
}

function CountStat({ target, label, format, delay = 0 }) {
  const [ref, visible] = useInView(0.3);
  const animated = useCountUp(target, visible, 1600);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <p className="font-display text-5xl font-bold tracking-tight text-olive sm:text-6xl md:text-7xl">
        {format(animated)}
      </p>
      <p className="mt-3 max-w-[16rem] font-sans text-base leading-snug text-brown sm:text-lg">
        {label}
      </p>
    </div>
  );
}

function ImageBand({
  src,
  alt,
  label,
  quote,
  reverse = false,
}) {
  return (
    <section className="relative mx-auto my-8 w-full md:my-12 md:max-w-5xl md:px-8">
      <div className="relative overflow-hidden md:grid md:grid-cols-2 md:items-stretch">
        <div
          className={`relative aspect-[3/4] w-full overflow-hidden md:min-h-[560px] md:aspect-auto ${
            reverse ? "md:order-2" : ""
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 40vw"
          />

          <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-brown-dark/90 via-brown-dark/55 to-transparent px-5 pb-16 pt-8 md:hidden">
            <FadeIn>
              <p className="mb-3 font-display text-xs font-medium uppercase tracking-[0.25em] text-olive-light">
                {label}
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="font-display text-xl font-medium leading-snug text-white sm:text-2xl">
                {quote}
              </p>
            </FadeIn>
          </div>
        </div>

        <div
          className={`hidden flex-col justify-center bg-brown-dark px-12 py-14 md:flex ${
            reverse ? "md:order-1" : ""
          }`}
        >
          <FadeIn>
            <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.25em] text-olive-light">
              {label}
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="font-display text-3xl font-medium leading-snug text-white lg:text-4xl">
              {quote}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
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
            Banano orgánico y agroforestería en Ecuador
          </h1>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="my-10 h-px w-16 bg-olive/40" />
        </FadeIn>

        <FadeIn>
          <p className="text-justify text-lg leading-relaxed text-foreground/85 sm:text-xl">
            El cultivo de banano tiene alta relevancia social y económica para
            Ecuador, siendo el país el principal exportador mundial.
          </p>
        </FadeIn>

        <div className="mt-12 flex flex-col items-center gap-10">
          <DonutChart
            percent={percentStats[0].percent}
            label={percentStats[0].label}
          />

          <FadeIn>
            <p className="max-w-xl text-center font-display text-xl font-medium leading-snug text-brown sm:text-2xl">
              Representando
            </p>
          </FadeIn>

          <DonutChart
            percent={percentStats[1].percent}
            label={percentStats[1].label}
            delay={80}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 border-t border-olive/20 pt-12 sm:grid-cols-2 sm:gap-10">
          {employmentStats.map((stat, index) => (
            <CountStat
              key={stat.label}
              target={stat.target}
              label={stat.label}
              format={stat.format}
              delay={index * 120}
            />
          ))}
        </div>

        <FadeIn delay={80}>
          <p className="mt-12 pb-16 text-justify text-lg leading-relaxed text-foreground/85 sm:text-xl md:pb-20">
            En los últimos años, los productores bananeros vienen enfrentando
            diversos desafíos que afectan la sostenibilidad del cultivo, tales
            como la pérdida de biodiversidad por el monocultivo intensivo, la
            vulnerabilidad ante el cambio climático, la volatilidad de los
            precios en los mercados internacionales, y la intensa competencia
            global que socava especialmente la sostenibilidad económica de los
            pequeños productores. En este contexto, se vuelve relevante que los
            productores adopten prácticas innovadoras y ecológicas,
            especialmente en la agricultura orgánica, para prosperar en
            segmentos de mercado que priorizan productos ambiental y
            socialmente responsables.
          </p>
        </FadeIn>
      </div>

      <ImageBand
        src={WORKER_IMAGE}
        alt="Trabajadora en la bananera sosteniendo un racimo de banano"
        label="CLUZON"
        quote="Innovación en banano orgánico que fomenta biodiversidad, suelo y agua."
      />

      <div className="relative mx-auto max-w-3xl px-6 pt-16 sm:px-8 md:pt-20">
        <FadeIn>
          <p className="text-justify text-lg leading-relaxed text-foreground/85 sm:text-xl">
            Desde esta perspectiva, la empresa CLUZON viene desarrollando
            procesos innovadores en el cultivo de banano orgánico que fomentan
            la biodiversidad, conservación del suelo y agua, a través del
            establecimiento de un sistema agroforestal con banano orgánico de
            exportación en la zona de bosque seco tropical, el cual es una
            innovación en el contexto del sector bananero, ya que se ha manejado
            históricamente basado en un esquema de monocultivo.
          </p>
        </FadeIn>
      </div>

      <ImageBand
        src={PLANTING_IMAGE}
        alt="Hombre sosteniendo una planta de banano lista para sembrar"
        label="Agroforestería"
        quote="Un sistema agroforestal que deja atrás el monocultivo."
        reverse
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 sm:px-8 md:pb-32 md:pt-20">
        <FadeIn>
          <p className="mb-3 font-display text-sm font-medium uppercase tracking-[0.25em] text-olive">
            Componentes
          </p>
          <h2 className="max-w-2xl font-display text-2xl font-bold tracking-tight text-olive-dark sm:text-3xl md:text-4xl">
            El proyecto busca desarrollar tres componentes
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {componentes.map((item, index) => (
            <FadeIn key={item} delay={index * 120}>
              <article className="group flex h-full flex-col border border-olive-dark/30 bg-olive p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-olive-dark sm:p-8">
                <span className="font-display text-5xl font-bold leading-none text-white/25 transition-colors duration-300 group-hover:text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="my-5 h-px w-10 bg-white/40 transition-all duration-300 group-hover:w-16 group-hover:bg-white/70" />
                <p className="font-sans text-base leading-relaxed text-justify text-white/90 sm:text-lg">
                  {item}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </article>
  );
}
