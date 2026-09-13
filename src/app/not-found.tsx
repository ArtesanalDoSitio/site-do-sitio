import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
      <p className="font-display text-3xl text-ink">Página não encontrada</p>
      <p className="text-ink/70">O conteúdo que você procura não existe ou foi movido.</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-cream transition hover:opacity-90"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
