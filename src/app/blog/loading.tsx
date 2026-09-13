import { CardGridSkeleton } from "@/components/Skeletons";

export default function LoadingBlog() {
  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="mb-10 h-9 w-32 animate-pulse rounded bg-neutral" />
      <CardGridSkeleton count={6} />
    </div>
  );
}
