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
      <p className="font-display text-[calc(1.25rem*var(--escala-titulos,1))] text-titulo">{titulo}</p>
      {descricao ? (
        <p className="max-w-md text-[calc(0.875rem*var(--escala-texto,1))] text-texto/70">{descricao}</p>
      ) : null}
      {acao}
    </div>
  );
}
