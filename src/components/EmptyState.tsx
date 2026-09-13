export function EmptyState({
  titulo,
  descricao,
  acao,
}: {
  titulo: string;
  descricao?: string;
  acao?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-neutral bg-neutral/30 px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">{titulo}</p>
      {descricao ? (
        <p className="max-w-md text-sm text-ink/70">{descricao}</p>
      ) : null}
      {acao}
    </div>
  );
}
