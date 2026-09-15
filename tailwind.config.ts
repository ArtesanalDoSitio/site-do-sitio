import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "base"/"text" sao nomes reservados do Tailwind (font-size etc.);
        // usamos nomes proprios para evitar colisao de classes utilitarias.
        cream: "#F6F1E9", // fundo
        ink: "#2B2320", // texto principal
        primary: "#B5502C", // acento terracota
        secondary: "#D3A24A", // acento mostarda
        neutral: "#E4D9C8", // bege medio
        footer: "#0f2015", // verde escuro extraido da logo, fundo do rodape
        // "titulo"/"texto" sao cores dinamicas, controladas via CSS var pelo Studio
        // (configuracoes > tipografia). O callback opacityValue e necessario porque
        // um valor de string simples nao suporta o modificador de opacidade "/NN" do
        // Tailwind quando a cor vem de uma variavel CSS (testado empiricamente).
        // O tipo oficial do Tailwind para "colors" nao contempla a forma de
        // funcao por-cor (apenas RecursiveKeyValuePair<string,string>), embora o
        // runtime do Tailwind aceite e resolva essa funcao normalmente — por isso
        // o cast para string abaixo (apenas para o TypeScript, sem efeito em runtime).
        titulo: (({ opacityValue }: { opacityValue?: string }) =>
          opacityValue === undefined
            ? `rgb(var(--cor-titulos-rgb))`
            : `rgb(var(--cor-titulos-rgb) / ${opacityValue})`) as unknown as string,
        texto: (({ opacityValue }: { opacityValue?: string }) =>
          opacityValue === undefined
            ? `rgb(var(--cor-texto-rgb))`
            : `rgb(var(--cor-texto-rgb) / ${opacityValue})`) as unknown as string,
      },
      fontFamily: {
        display: ["var(--font-titulos, var(--font-display))"],
        sans: ["var(--font-texto, var(--font-sans))"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
