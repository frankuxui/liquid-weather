import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "@/components/glass/glass-card";

export default function CitiesLoading() {
  return (
    <div className="mx-auto max-w-7xl px-10 py-12">
      <Skeleton className="mb-3 h-6 w-24 rounded-full" />
      <Skeleton className="h-12 w-96 max-w-full" />
      <Skeleton className="mt-3 h-5 w-72 max-w-full" />

      <Skeleton className="mb-8 mt-8 h-28 w-full" />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <GlassCard key={i} className="p-5">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-14 w-24" />
            <Skeleton className="mt-4 h-10 w-full" />
            <Skeleton className="mt-4 h-12 w-full" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
