import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { sobreQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

async function getSobre() {
  try {
    return await client.fetch(sobreQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const sobre = await getSobre();
  return {
    title: "Sobre",
    description:
      sobre?.conteudo?.[0]?.children?.[0]?.text ||
      "Conheça a história por trás dos nossos produtos artesanais.",
  };
}

const conteudoPadrao = [
  {
    _type: "block",
    _key: "p1",
    children: [
      {
        _type: "span",
        text: "[Conte aqui a história da sua padaria/confeitaria: como começou, o que inspira o trabalho artesanal e o que torna seus produtos únicos.]",
      },
    ],
  },
  {
    _type: "block",
    _key: "p2",
    children: [
      {
        _type: "span",
        text: "[Fale sobre os ingredientes, técnicas e processos que valorizam a qualidade gourmet dos produtos.]",
      },
    ],
  },
  {
    _type: "block",
    _key: "p3",
    children: [
      {
        _type: "span",
        text: "[Se fizer sentido, apresente a equipe ou quem está por trás da marca.]",
      },
    ],
  },
];

export default async function SobrePage() {
  const sobre = await getSobre();

  const titulo = sobre?.titulo || "Nossa história";
  const conteudo = sobre?.conteudo || conteudoPadrao;

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <h1 className="font-display text-[calc(1.875rem*var(--escala-titulos,1))] text-titulo sm:text-[calc(2.25rem*var(--escala-titulos,1))]">{titulo}</h1>

      {sobre?.imagem ? (
        <div className="relative mt-8 aspect-[16/9] max-w-2xl overflow-hidden rounded-lg bg-neutral">
          <Image
            src={urlForImage(sobre.imagem).width(1200).url()}
            alt={titulo}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-neutral mt-6 max-w-2xl text-texto/80">
        <PortableText value={conteudo} />
      </div>
    </div>
  );
}
