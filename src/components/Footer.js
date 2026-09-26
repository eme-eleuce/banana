import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-olive/20 bg-brown-dark text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between">
        <Link href="/" className="relative block h-14 w-40">
          <Image
            src="/logos/Recurso%202.png"
            alt="The Best Sustainable Banana"
            fill
            className="object-contain object-center md:object-left brightness-0 invert"
            sizes="160px"
          />
        </Link>

        <p className="max-w-sm text-center text-sm leading-relaxed text-white/70 md:text-right">
          Banana, ecología y producción sostenible.
        </p>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} The Best Sustainable Banana
      </div>
    </footer>
  );
}
