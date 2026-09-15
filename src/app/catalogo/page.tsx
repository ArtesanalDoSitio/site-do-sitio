import type { Metadata } from "next";

import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ErrorState } from "@/components/ErrorState";
import { client } from "@/sanity/lib/client";
import { categoriasQuery, produtosQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Conheça nossos produtos artesanais gourmet.",
};

export const revalidate = 60;

async function getCatalogo() {
  try {
    const [produtos, categorias] = await Promise.all([
      client.fetch(produtosQuery),
      client.fetch(categoriasQuery),
    ]);
    return { produtos, categorias, erro: false };
  } catch {
    return { produtos: [], categorias: [], erro: true };
  }
}

export default async function CatalogoPage() {
  const { produtos, categorias, erro } = await getCatalogo();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <h1 className="font-display text-[calc(1.875rem*var(--escala-titulos,1))] text-titulo sm:text-[calc(2.25rem*var(--escala-titulos,1))]">Produtos</h1>
      <p className="mt-3 max-w-lg text-texto/70">
        Explore por categoria ou busque pelo nome do produto.
      </p>

      <div className="mt-10">
        {erro ? (
          <ErrorState descricao="Não foi possível carregar o catálogo agora." />
        ) : (
          <CatalogExplorer produtos={produtos} categorias={categorias} />
        )}
      </div>
    </div>
  );
}
