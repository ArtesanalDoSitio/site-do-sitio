import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <p className="font-display text-[calc(1.875rem*var(--escala-titulos,1))] text-titulo">Página não encontrada</p>
      <p className="text-texto/70">O conteúdo que você procura não existe ou foi movido.</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-6 py-2.5 text-[calc(0.875rem*var(--escala-texto,1))] font-medium text-cream transition hover:opacity-90"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
