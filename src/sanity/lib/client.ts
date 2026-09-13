import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // dados publicos (catalogo/blog) podem usar CDN cacheado
  perspective: "published",
});
