"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Principal" },
  { href: "/catalogo", label: "Produtos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-center font-display text-[calc(2.25rem*var(--escala-titulos,1))] tracking-tight text-titulo sm:flex-row sm:items-center sm:gap-2 sm:text-left sm:text-[calc(2.8125rem*var(--escala-titulos,1))]"
        >
          <Image
            src="/images/logo-artesanal-do-sitio.png"
            alt="Artesanal do Sítio"
            width={256}
            height={261}
            priority
            className="h-[81px] w-[81px] object-contain sm:h-[90px] sm:w-[90px]"
          />
          Artesanal do Sítio
        </Link>

        <nav className="hidden gap-8 sm:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[calc(1.70625rem*var(--escala-texto,1))] transition ${
                  active ? "text-primary" : "text-texto/80 hover:text-texto"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 sm:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-neutral px-4 pb-4 sm:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-[calc(0.875rem*var(--escala-texto,1))] text-texto/80 hover:bg-neutral/50 hover:text-texto"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
