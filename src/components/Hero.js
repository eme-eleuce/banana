import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-0 h-svh overflow-hidden bg-olive-dark"
      aria-label="Video de la bananera sostenible"
    >
      <video
        className="fixed inset-0 z-0 h-svh w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 sm:bottom-10">
        <Link
          href="/#videos"
          className="border border-white/70 bg-black/25 px-5 py-2.5 font-display text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-black/40"
        >
          Ver video
        </Link>
      </div>
    </section>
  );
}
