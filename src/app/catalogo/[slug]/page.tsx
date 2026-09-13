import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { WhatsAppButton } from "@/components/WhatsAppButton";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  configuracoesQuery,
  produtoPorSlugQuery,
  produtoSlugsQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(produtoSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function getProduto(slug: string) {
  return client.fetch(produtoPorSlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const produto = await getProduto(slug);
    if (!produto) return {};
    return {
      title: produto.nome,
      description: produto.descricaoCurta,
    };
  } catch {
    return {};
  }
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let produto;
  try {
    produto = await getProduto(slug);
  } catch {
    produto = null;
  }

  if (!produto) notFound();

  let config;
  try {
    config = await client.fetch(configuracoesQuery);
  } catch {
    config = null;
  }

  const mensagem = `Olá! Tenho interesse no produto "${produto.nome}".`;
  const imagemPrincipal = produto.imagens?.[0];

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral">
            {imagemPrincipal ? (
              <Image
                src={urlForImage(imagemPrincipal).width(900).height(675).url()}
                alt={produto.nome}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : null}
          </div>
          {produto.imagens?.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {produto.imagens.slice(1, 5).map((img: any, i: number) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded bg-neutral"
                >
                  <Image
                    src={urlForImage(img).width(200).height(200).url()}
                    alt={`${produto.nome} ${i + 2}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          {produto.categoria ? (
            <span className="text-xs uppercase tracking-wide text-primary">
              {produto.categoria.titulo}
            </span>
          ) : null}
          <h1 className="mt-1 font-display text-3xl text-ink">{produto.nome}</h1>
          {produto.descricao ? (
            <p className="mt-4 text-ink/80">{produto.descricao}</p>
          ) : null}

          <div className="mt-8">
            <WhatsAppButton
              numero={config?.whatsappNumero}
              mensagem={mensagem}
              label="Pedir via WhatsApp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
