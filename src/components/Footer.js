import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-olive/15 bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex w-44 flex-col items-center gap-4 sm:w-52">
          <Link
            href="/"
            className="relative block h-16 w-full sm:h-20"
          >
            <Image
              src="/logos/Recurso%201.png"
              alt="The Best Sustainable Banana"
              fill
              className="object-contain object-center"
              sizes="208px"
            />
          </Link>

          <a
            href="https://www.instagram.com/thebest_sustainablebanana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @thebest_sustainablebanana"
            className="inline-flex text-olive-dark transition-colors hover:text-brown"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
        </div>

        <div
          className="h-px w-16 bg-olive/25 md:h-20 md:w-px md:shrink-0 lg:h-24"
          aria-hidden
        />

        <div className="flex w-full flex-col items-center gap-4 md:items-start md:gap-3">
          <p className="font-display text-xs font-medium uppercase tracking-[0.25em] text-olive-dark sm:text-sm">
            En colaboración con:
          </p>
          <div className="relative h-16 w-full max-w-xl sm:h-20 md:h-20 md:max-w-2xl lg:h-24 lg:max-w-3xl">
            <Image
              src="/logos/Recurso%203.png"
              alt="Cooperación Alemana, develoPPP, GIZ, Cluzon e Interfrucht"
              fill
              className="object-contain object-center mix-blend-multiply md:object-left"
              sizes="(max-width: 768px) 90vw, 720px"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-olive/15 px-4 py-4 text-center text-xs text-foreground/45">
        © {new Date().getFullYear()} The Best Sustainable Banana
      </div>
    </footer>
  );
}
