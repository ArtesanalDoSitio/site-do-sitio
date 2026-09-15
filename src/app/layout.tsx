import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { configuracoesQuery } from "@/sanity/lib/queries";
import "./globals.css";

const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Artesanal do Sítio — Padaria e confeitaria artesanal",
    template: "%s | Artesanal do Sítio",
  },
  description:
    "Produtos artesanais gourmet feitos com carinho — conheça nosso catálogo e nossa história.",
};

type Tipografia = {
  fonteTitulos?: string;
  corTitulos?: string;
  tamanhoTitulos?: number;
  pesoTitulos?: string;
  italicoTitulos?: boolean;
  fonteTexto?: string;
  corTexto?: string;
  tamanhoTexto?: number;
  pesoTexto?: string;
  italicoTexto?: boolean;
};

// Aceita apenas letras, numeros, espaco e hifen — evita injecao de CSS/HTML
// a partir de um valor livre digitado no Studio.
function sanitizeFontName(name?: string): string | null {
  if (!name) return null;
  const cleaned = name.replace(/[^a-zA-Z0-9 -]/g, "").trim();
  return cleaned.length > 0 ? cleaned : null;
}

function sanitizeHex(hex?: string): string | null {
  if (!hex) return null;
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex) ? hex : null;
}

function hexToRgbTriplet(hex: string): string {
  let h = hex.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function googleFontHref(fontName: string): string {
  const familia = fontName.trim().replace(/\s+/g, "+");
  return `https://fonts.googleapis.com/css2?family=${familia}:wght@400;500;600;700&display=swap`;
}

async function getTipografia(): Promise<Tipografia | null> {
  try {
    const config = await client.fetch(
      configuracoesQuery,
      {},
      { next: { revalidate: 60 } }
    );
    return config?.tipografia ?? null;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tipografia = await getTipografia();

  const fonteTitulos = sanitizeFontName(tipografia?.fonteTitulos);
  const fonteTexto = sanitizeFontName(tipografia?.fonteTexto);
  const corTitulosHex = sanitizeHex(tipografia?.corTitulos);
  const corTextoHex = sanitizeHex(tipografia?.corTexto);
  const tamanhoTitulos = tipografia?.tamanhoTitulos;
  const tamanhoTexto = tipografia?.tamanhoTexto;
  const pesoTitulos = tipografia?.pesoTitulos;
  const pesoTexto = tipografia?.pesoTexto;

  const googleFontFamilias = [fonteTitulos, fonteTexto].filter(
    (f): f is string => Boolean(f)
  );

  const cssVars: string[] = [];
  if (fonteTitulos) cssVars.push(`--font-titulos: "${fonteTitulos}", var(--font-display);`);
  if (fonteTexto) cssVars.push(`--font-texto: "${fonteTexto}", var(--font-sans);`);
  if (corTitulosHex) cssVars.push(`--cor-titulos-rgb: ${hexToRgbTriplet(corTitulosHex)};`);
  if (corTextoHex) cssVars.push(`--cor-texto-rgb: ${hexToRgbTriplet(corTextoHex)};`);
  if (typeof tamanhoTitulos === "number" && tamanhoTitulos > 0)
    cssVars.push(`--escala-titulos: ${tamanhoTitulos / 100};`);
  if (typeof tamanhoTexto === "number" && tamanhoTexto > 0)
    cssVars.push(`--escala-texto: ${tamanhoTexto / 100};`);
  if (pesoTitulos) cssVars.push(`--peso-titulos: ${parseInt(pesoTitulos, 10) || 500};`);
  if (pesoTexto) cssVars.push(`--peso-texto: ${parseInt(pesoTexto, 10) || 400};`);
  if (tipografia?.italicoTitulos) cssVars.push(`--estilo-titulos: italic;`);
  if (tipografia?.italicoTexto) cssVars.push(`--estilo-texto: italic;`);

  return (
    <html lang="pt-BR" className={`${fontDisplay.variable} ${fontSans.variable}`}>
      <head>
        {googleFontFamilias.length > 0
          ? googleFontFamilias.map((familia) => (
              <link
                key={familia}
                rel="stylesheet"
                href={googleFontHref(familia)}
              />
            ))
          : null}
        {cssVars.length > 0 ? (
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `:root { ${cssVars.join(" ")} }`,
            }}
          />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
