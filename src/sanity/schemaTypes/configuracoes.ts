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
      name: "email",
      title: "E-mail de contato",
      type: "email",
    }),
    defineField({
      name: "endereco",
      title: "Endereço",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "rodapeTexto",
      title: "Texto do rodapé",
      description: "Frase exibida abaixo do nome da marca, no rodapé do site.",
      type: "string",
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
    defineField({
      name: "tipografia",
      title: "Tipografia do site",
      description:
        "Controle total sobre fonte, cor, tamanho e estilo dos títulos e textos do site inteiro (inclui o nome da marca no topo). A foto de capa da Home e o rodapé mantêm o texto claro, para garantir legibilidade sobre fundo escuro.",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "fonteTitulos",
          title: "Fonte dos títulos",
          description:
            'Nome exato de uma fonte do Google Fonts (ex: "Playfair Display"). Deixe em branco para usar a fonte padrão do site.',
          type: "string",
        }),
        defineField({
          name: "corTitulos",
          title: "Cor dos títulos",
          description: "Código hex, ex: #2B2320.",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: "cor hex" })
              .warning("Use um código hex válido, ex: #2B2320"),
        }),
        defineField({
          name: "tamanhoTitulos",
          title: "Tamanho dos títulos (%)",
          description: "100 = tamanho padrão. Aumenta ou diminui todos os títulos proporcionalmente.",
          type: "number",
          initialValue: 100,
          validation: (rule) => rule.min(50).max(200),
        }),
        defineField({
          name: "pesoTitulos",
          title: "Peso dos títulos",
          type: "string",
          options: {
            list: [
              { title: "Normal", value: "400" },
              { title: "Médio", value: "500" },
              { title: "Semi-negrito", value: "600" },
              { title: "Negrito", value: "700" },
            ],
          },
        }),
        defineField({
          name: "italicoTitulos",
          title: "Títulos em itálico",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "fonteTexto",
          title: "Fonte do texto",
          description:
            "Nome exato de uma fonte do Google Fonts. Deixe em branco para usar a fonte padrão do site.",
          type: "string",
        }),
        defineField({
          name: "corTexto",
          title: "Cor do texto",
          description: "Código hex, ex: #2B2320.",
          type: "string",
          validation: (rule) =>
            rule
              .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: "cor hex" })
              .warning("Use um código hex válido, ex: #2B2320"),
        }),
        defineField({
          name: "tamanhoTexto",
          title: "Tamanho do texto (%)",
          description: "100 = tamanho padrão. Aumenta ou diminui todo o texto corrido proporcionalmente.",
          type: "number",
          initialValue: 100,
          validation: (rule) => rule.min(50).max(200),
        }),
        defineField({
          name: "pesoTexto",
          title: "Peso do texto",
          type: "string",
          options: {
            list: [
              { title: "Normal", value: "400" },
              { title: "Médio", value: "500" },
              { title: "Semi-negrito", value: "600" },
              { title: "Negrito", value: "700" },
            ],
          },
        }),
        defineField({
          name: "italicoTexto",
          title: "Texto em itálico",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Configurações do Site" };
    },
  },
});
