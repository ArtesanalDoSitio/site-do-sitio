import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { postPorSlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { formatDate } from "@/lib/whatsapp";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(postSlugsQuery);
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

async function getPost(slug: string) {
  return client.fetch(postPorSlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    if (!post) return {};
    return { title: post.titulo, description: post.resumo };
  } catch {
    return {};
  }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="relative my-6 aspect-[16/9] overflow-hidden rounded-lg bg-neutral">
        <Image
          src={urlForImage(value).width(1200).url()}
          alt=""
          fill
          sizes="(min-width: 768px) 700px, 100vw"
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    post = null;
  }

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="text-[calc(0.75rem*var(--escala-texto,1))] uppercase tracking-wide text-texto/50">
        {formatDate(post.publicadoEm)}
      </p>
      <h1 className="mt-2 font-display text-[calc(1.875rem*var(--escala-titulos,1))] text-titulo sm:text-[calc(2.25rem*var(--escala-titulos,1))]">
        {post.titulo}
      </h1>

      {post.capa ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg bg-neutral">
          <Image
            src={urlForImage(post.capa).width(1200).url()}
            alt={post.titulo}
            fill
            sizes="(min-width: 768px) 700px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-neutral mt-8 max-w-none text-texto/90">
        <PortableText value={post.conteudo} components={portableTextComponents} />
      </div>
    </article>
  );
}
