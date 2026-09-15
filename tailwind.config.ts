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
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
