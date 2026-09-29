import Image from "next/image";

const HERO_IMAGE =
  "/images/DJI_20260910083511_0166_D.JPG";

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
        <div className="relative mb-8 h-40 w-56 animate-[fade-up_0.9s_ease-out_both] sm:h-52 sm:w-72 md:h-60 md:w-80">
          <Image
            src="/logos/Recurso%202.png"
            alt="The Best Sustainable Banana"
            fill
            className="object-contain drop-shadow-lg brightness-0 invert"
            sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, 320px"
            preload
          />
        </div>

        <p className="max-w-xl animate-[fade-up_0.9s_ease-out_0.2s_both] font-display text-lg font-medium leading-snug tracking-wide text-white/95 sm:text-xl md:text-2xl">
          Sitio web en construcción
        </p>
      </div>
    </section>
  );
}
