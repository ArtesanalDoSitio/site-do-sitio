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
          className="flex flex-col items-center gap-1 text-center font-display text-2xl tracking-tight text-ink sm:flex-row sm:items-center sm:gap-2 sm:text-left sm:text-3xl"
        >
          <Image
            src="/images/logo-artesanal-do-sitio.png"
            alt="Artesanal do Sítio"
            width={256}
            height={261}
            priority
            className="h-[54px] w-[54px] object-contain sm:h-[60px] sm:w-[60px]"
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
                className={`text-sm transition ${
                  active ? "text-primary" : "text-ink/80 hover:text-ink"
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
              className="rounded px-2 py-2 text-sm text-ink/80 hover:bg-neutral/50 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
