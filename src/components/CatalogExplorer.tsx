"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

type Categoria = { _id: string; titulo: string; slug: string };
type Produto = {
  _id: string;
  nome: string;
  slug: string;
  descricaoCurta?: string;
  imagens?: any[];
  categoria?: { titulo: string; slug: string };
};

export function CatalogExplorer({
  produtos,
  categorias,
}: {
  produtos: Produto[];
  categorias: Categoria[];
}) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | "todas">("todas");
  const [busca, setBusca] = useState("");

  const produtosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((produto) => {
      const bateCategoria =
        categoriaAtiva === "todas" || produto.categoria?.slug === categoriaAtiva;
      const bateBusca =
        !termo ||
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricaoCurta?.toLowerCase().includes(termo);
      return bateCategoria && bateBusca;
    });
  }, [produtos, categoriaAtiva, busca]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoriaAtiva("todas")}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              categoriaAtiva === "todas"
                ? "border-primary bg-primary text-cream"
                : "border-neutral text-ink/70 hover:border-ink"
            }`}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria._id}
              type="button"
              onClick={() => setCategoriaAtiva(categoria.slug)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                categoriaAtiva === categoria.slug
                  ? "border-primary bg-primary text-cream"
                  : "border-neutral text-ink/70 hover:border-ink"
              }`}
            >
              {categoria.titulo}
            </button>
          ))}
        </div>

        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full rounded-full border border-neutral bg-cream px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-primary focus:outline-none sm:w-64"
        />
      </div>

      {produtosFiltrados.length === 0 ? (
        <EmptyState
          titulo="Nenhum produto encontrado"
          descricao="Tente limpar os filtros ou buscar por outro termo."
          acao={
            <button
              type="button"
              onClick={() => {
                setCategoriaAtiva("todas");
                setBusca("");
              }}
              className="mt-2 rounded-full border border-ink px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-cream"
            >
              Limpar filtros
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {produtosFiltrados.map((produto) => (
            <ProductCard key={produto._id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
}
