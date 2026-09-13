import { defineField, defineType } from "sanity";

export default defineType({
  name: "produto",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "nome", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoria" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descricaoCurta",
      title: "Descrição curta",
      description: "Usada nos cards do catálogo (1-2 frases)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "descricao",
      title: "Descrição completa",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "imagens",
      title: "Imagens",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.min(1).error("Adicione ao menos uma imagem"),
    }),
    defineField({
      name: "destaque",
      title: "Destaque na Home",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "nome", subtitle: "categoria.titulo", media: "imagens.0" },
  },
});
