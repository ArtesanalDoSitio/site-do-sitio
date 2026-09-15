import { defineField, defineType } from "sanity";

export default defineType({
  name: "configuracoes",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "whatsappNumero",
      title: "Número do WhatsApp",
      description: "Com DDI e DDD, somente dígitos (ex: 5511999999999)",
      type: "string",
    }),
    defineField({
      name: "whatsappMensagemPadrao",
      title: "Mensagem padrão do WhatsApp",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram (URL)",
      type: "url",
    }),
    defineField({
      name: "endereco",
      title: "Endereço",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroImagem",
      title: "Foto de capa (Home)",
      description: "Foto de fundo exibida no topo da página inicial",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroTitulo",
      title: "Título de capa (Home)",
      description: "Frase principal exibida sobre a foto de capa",
      type: "string",
    }),
    defineField({
      name: "heroTexto",
      title: "Texto de capa (Home)",
      description: "Frase de apoio exibida abaixo do título, sobre a foto de capa",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações do Site" };
    },
  },
});
