import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import { formatDate } from "@/lib/whatsapp";

type Post = {
  _id: string;
  titulo: string;
  slug: string;
  resumo?: string;
  capa?: any;
  publicadoEm: string;
};

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-lg border border-neutral bg-cream transition hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral">
        {post.capa ? (
          <Image
            src={urlForImage(post.capa).width(700).height(440).url()}
            alt={post.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="space-y-1 p-4">
        <span className="text-[calc(0.75rem*var(--escala-texto,1))] uppercase tracking-wide text-texto/50">
          {formatDate(post.publicadoEm)}
        </span>
        <h3 className="font-display text-[calc(1.125rem*var(--escala-titulos,1))] text-titulo">{post.titulo}</h3>
        {post.resumo ? (
          <p className="line-clamp-2 text-[calc(0.875rem*var(--escala-texto,1))] text-texto/70">{post.resumo}</p>
        ) : null}
      </div>
    </Link>
  );
}
