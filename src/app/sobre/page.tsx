import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história por trás dos nossos produtos artesanais.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Nossa história</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-ink/80">
        <p>
          [Conte aqui a história da sua padaria/confeitaria: como começou, o que
          inspira o trabalho artesanal e o que torna seus produtos únicos.]
        </p>
        <p>
          [Fale sobre os ingredientes, técnicas e processos que valorizam a
          qualidade gourmet dos produtos.]
        </p>
        <p>
          [Se fizer sentido, apresente a equipe ou quem está por trás da marca.]
        </p>
      </div>
    </div>
  );
}
