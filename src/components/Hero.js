import Image from "next/image";

const HERO_IMAGE = "/images/DJI_20260910083511_0166_D.JPG";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Vista aérea de la bananera"
        fill
        preload
        className="object-cover object-center"
        sizes="100vw"
        quality={85}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 pt-16 text-center">
        <p className="max-w-xl animate-[fade-up_0.9s_ease-out_both] font-display text-lg font-medium leading-snug tracking-wide text-white/95 sm:text-xl md:text-2xl">
          Sitio web en construcción
        </p>
      </div>
    </section>
  );
}
