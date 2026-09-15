import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";

type Produto = {
  _id: string;
  nome: string;
  slug: string;
  descricaoCurta?: string;
  imagens?: any[];
  categoria?: { titulo: string; slug: string };
};

export function ProductCard({ produto }: { produto: Produto }) {
  const imagem = produto.imagens?.[0];

  return (
    <Link
      href={`/catalogo/${produto.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral bg-cream transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral">
        {imagem ? (
          <Image
            src={urlForImage(imagem).width(600).height(450).url()}
            alt={produto.nome}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        {produto.categoria ? (
          <span className="text-[calc(0.75rem*var(--escala-texto,1))] uppercase tracking-wide text-primary">
            {produto.categoria.titulo}
          </span>
        ) : null}
        <h3 className="font-display text-[calc(1.125rem*var(--escala-titulos,1))] text-titulo">{produto.nome}</h3>
        {produto.descricaoCurta ? (
          <p className="line-clamp-2 text-[calc(0.875rem*var(--escala-texto,1))] text-texto/70">
            {produto.descricaoCurta}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
