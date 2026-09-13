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
        <span className="text-xs uppercase tracking-wide text-ink/50">
          {formatDate(post.publicadoEm)}
        </span>
        <h3 className="font-display text-lg text-ink">{post.titulo}</h3>
        {post.resumo ? (
          <p className="line-clamp-2 text-sm text-ink/70">{post.resumo}</p>
        ) : null}
      </div>
    </Link>
  );
}
