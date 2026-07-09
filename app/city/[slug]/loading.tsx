import { Skeleton } from "@/components/ui/skeleton";
import { GlassCard } from "@/components/glass/glass-card";

export default function CityLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-10 py-8">
      <GlassCard strong className="p-8">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
        <Skeleton className="mt-6 h-10 w-56" />
        <Skeleton className="mt-6 h-24 w-72" />
      </GlassCard>

      <Skeleton className="h-40 w-full" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Skeleton className="h-72 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  );
}
