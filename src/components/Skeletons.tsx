function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-neutral ${className ?? ""}`} />;
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Pulse className="aspect-[4/3] w-full" />
          <Pulse className="h-4 w-2/3" />
          <Pulse className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function TextBlockSkeleton() {
  return (
    <div className="space-y-3">
      <Pulse className="h-6 w-1/2" />
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-5/6" />
      <Pulse className="h-4 w-3/4" />
    </div>
  );
}
