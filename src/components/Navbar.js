"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#fotos", label: "Fotos" },
  { href: "#videos", label: "Videos" },
  { href: "#proyecto", label: "Proyecto" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  const solid = scrolled || open;
  const linkClass = solid
    ? "text-white/90 hover:text-white"
    : "text-black hover:text-black/70";
  const barClass = solid ? "bg-white" : "bg-black";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-olive-dark" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-6">
        <Link
          href="/"
          className="relative block h-14 w-40 shrink-0 sm:h-16 sm:w-48"
          onClick={closeMenu}
        >
          <Image
            src={solid ? "/logos/Recurso%202.png" : "/logos/Recurso%201.png"}
            alt="The Best Sustainable Banana"
            fill
            className={`object-contain object-left transition-opacity duration-300 ${
              solid ? "brightness-0 invert" : ""
            }`}
            sizes="192px"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`font-display text-3xl font-medium uppercase tracking-wide transition-colors duration-300 ${linkClass}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">{open ? "Cerrar" : "Abrir"}</span>
          <span className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`block h-0.5 w-full origin-center transition-all duration-300 ${barClass} ${
                open ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full transition-all duration-300 ${barClass} ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full origin-center transition-all duration-300 ${barClass} ${
                open ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-out md:hidden ${
          open ? "max-h-72" : "max-h-0"
        } ${solid ? "bg-olive-dark" : "bg-transparent"}`}
      >
        <ul
          className={`flex flex-col gap-1 px-4 py-3 ${
            solid ? "border-t border-white/10" : "border-t border-black/10"
          }`}
        >
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={closeMenu}
                className={`block rounded-md px-3 py-3 font-display text-3xl font-medium uppercase tracking-wide transition-colors duration-300 ${linkClass} ${
                  solid ? "hover:bg-white/10" : "hover:bg-black/5"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
