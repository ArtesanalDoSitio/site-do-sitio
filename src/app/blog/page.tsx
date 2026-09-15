import type { Metadata } from "next";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { PostCard } from "@/components/PostCard";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Histórias, bastidores e novidades da nossa cozinha.",
};

export const revalidate = 60;

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery);
    return { posts, erro: false };
  } catch {
    return { posts: [], erro: true };
  }
}

export default async function BlogPage() {
  const { posts, erro } = await getPosts();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <h1 className="font-display text-[calc(1.875rem*var(--escala-titulos,1))] text-titulo sm:text-[calc(2.25rem*var(--escala-titulos,1))]">Blog</h1>
      <p className="mt-3 max-w-lg text-texto/70">
        Histórias e novidades sobre nossos produtos e processo artesanal.
      </p>

      <div className="mt-10">
        {erro ? (
          <ErrorState descricao="Não foi possível carregar o blog agora." />
        ) : posts.length === 0 ? (
          <EmptyState
            titulo="Ainda não há posts publicados"
            descricao="Em breve traremos novidades por aqui."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
