import { defineField, defineType } from "sanity";

export default defineType({
  name: "sobre",
  title: "Página Sobre",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      initialValue: "Nossa história",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "conteudo",
      title: "Conteúdo",
      description:
        "Conte a história da marca, os ingredientes/técnicas usados e quem está por trás dela. Cada parágrafo vira um bloco de texto na página.",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imagem",
      title: "Foto (opcional)",
      description: "Foto da equipe, do espaço ou de quem está por trás da marca",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "titulo" },
    prepare({ title }) {
      return { title: title || "Página Sobre" };
    },
  },
});
