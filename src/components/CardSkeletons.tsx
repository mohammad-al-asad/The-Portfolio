import { Skeleton } from "@/components/ui/skeleton";

// Mirrors a row in the admin message lists (avatar, name, subject, preview)
export function MessageRowSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex gap-3 ${compact ? "px-5 py-3.5" : "px-4 py-3.5"}`}
      aria-hidden
    >
      <Skeleton className={`${compact ? "h-9 w-9" : "h-10 w-10"} rounded-full shrink-0`} />
      <div className="flex-1 space-y-2 pt-0.5">
        <div className="flex justify-between gap-3">
          <Skeleton className="h-3.5 w-1/3" />
          <Skeleton className="h-3 w-10" />
        </div>
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

