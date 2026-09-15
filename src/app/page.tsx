import Image from "next/image";
import Link from "next/link";

import { PostCard } from "@/components/PostCard";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  configuracoesQuery,
  postsRecentesQuery,
  produtosDestaqueQuery,
} from "@/sanity/lib/queries";

async function getHomeData() {
  try {
    const [produtosDestaque, postsRecentes, config] = await Promise.all([
      client.fetch(produtosDestaqueQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(postsRecentesQuery, {}, { next: { revalidate: 60 } }),
      client.fetch(configuracoesQuery, {}, { next: { revalidate: 60 } }),
    ]);
    return { produtosDestaque, postsRecentes, config, erro: false };
  } catch {
    return { produtosDestaque: [], postsRecentes: [], config: null, erro: true };
  }
}

export default async function HomePage() {
  const { produtosDestaque, postsRecentes, config } = await getHomeData();

  const heroImagemUrl = config?.heroImagem
    ? urlForImage(config.heroImagem).width(1920).height(1080).url()
    : null;
  const heroTitulo =
    config?.heroTitulo || "Sabor artesanal, feito com cuidado todos os dias";
  const heroTexto =
    config?.heroTexto ||
    "Pães, doces e produtos gourmet preparados com técnica artesanal e ingredientes selecionados.";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-neutral">
        {heroImagemUrl ? (
          <Image
            src={heroImagemUrl}
            alt={heroTitulo}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <Image
            src="/images/hero-pao-artesanal.jpg"
            alt="Pão artesanal de fermentação natural, recém-assado"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAMABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQF/8QAIRAAAgEDAwUAAAAAAAAAAAAAAQIDAAQREiFBEyJRYYH/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERAiH/2gAMAwEAAhEDEQA/ABCkNxJcsw2QgDDbH3RGiO6jdSUBBAwdgftZPVkiMjRuVJxnHNTCaRpO5yR44ousV5Uh/9k="
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />

        <div className="relative mx-auto flex max-w-content flex-col items-start gap-6 px-4 py-24 sm:px-6 sm:py-32">
          <h1 className="max-w-xl font-display text-[calc(2.25rem*var(--escala-titulos,1))] leading-tight text-cream sm:text-[calc(3rem*var(--escala-titulos,1))]">
            {heroTitulo}
          </h1>
          <p className="max-w-lg text-cream/85">{heroTexto}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogo"
              className="rounded-full bg-primary px-6 py-2.5 text-[calc(0.875rem*var(--escala-texto,1))] font-medium text-cream transition hover:opacity-90"
            >
              Ver produtos
            </Link>
            <WhatsAppButton
              numero={config?.whatsappNumero}
              mensagem={config?.whatsappMensagemPadrao}
              variant="outline-light"
            />
          </div>
        </div>
      </section>

      {produtosDestaque.length > 0 ? (
        <section className="mx-auto max-w-content px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-[calc(1.5rem*var(--escala-titulos,1))] text-titulo">Destaques</h2>
            <Link href="/catalogo" className="text-[calc(0.875rem*var(--escala-texto,1))] text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produtosDestaque.map((produto: any) => (
              <ProductCard key={produto._id} produto={produto} />
            ))}
          </div>
        </section>
      ) : null}

      {postsRecentes.length > 0 ? (
        <section className="border-t border-neutral bg-neutral/20">
          <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-[calc(1.5rem*var(--escala-titulos,1))] text-titulo">Do blog</h2>
              <Link href="/blog" className="text-[calc(0.875rem*var(--escala-texto,1))] text-primary hover:underline">
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {postsRecentes.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
