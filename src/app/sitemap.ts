import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { postSlugsQuery, produtoSlugsQuery } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginasEstaticas: MetadataRoute.Sitemap = [
    "",
    "/sobre",
    "/catalogo",
    "/blog",
    "/contato",
  ].map((rota) => ({
    url: `${siteUrl}${rota}`,
    lastModified: new Date(),
  }));

  try {
    const [produtoSlugs, postSlugs] = await Promise.all([
      client.fetch<string[]>(produtoSlugsQuery),
      client.fetch<string[]>(postSlugsQuery),
    ]);

    const paginasProdutos: MetadataRoute.Sitemap = produtoSlugs.map((slug) => ({
      url: `${siteUrl}/catalogo/${slug}`,
      lastModified: new Date(),
    }));

    const paginasPosts: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
    }));

    return [...paginasEstaticas, ...paginasProdutos, ...paginasPosts];
  } catch {
    return paginasEstaticas;
  }
}
