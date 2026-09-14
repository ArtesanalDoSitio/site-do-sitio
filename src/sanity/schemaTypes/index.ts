import { type SchemaTypeDefinition } from "sanity";

import categoria from "./categoria";
import configuracoes from "./configuracoes";
import post from "./post";
import produto from "./produto";
import sobre from "./sobre";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [produto, categoria, post, configuracoes, sobre],
};
