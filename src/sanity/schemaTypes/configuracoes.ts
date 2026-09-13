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
  ],
  preview: {
    prepare() {
      return { title: "Configurações do Site" };
    },
  },
});
