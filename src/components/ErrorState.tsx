"use client";

export function ErrorState({
  titulo = "Não foi possível carregar o conteúdo",
  descricao = "Tente novamente em instantes.",
  onRetry,
}: {
  titulo?: string;
  descricao?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-primary/30 bg-primary/5 px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">{titulo}</p>
      <p className="max-w-md text-sm text-ink/70">{descricao}</p>
      <button
        type="button"
        onClick={onRetry ?? (() => window.location.reload())}
        className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-cream transition hover:opacity-90"
      >
        Tentar novamente
      </button>
    </div>
  );
}
