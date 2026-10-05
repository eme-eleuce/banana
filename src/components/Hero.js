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
    </section>
  );
}
