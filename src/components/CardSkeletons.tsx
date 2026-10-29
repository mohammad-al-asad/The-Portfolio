import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const cardClass =
  "bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none";

// Mirrors SingleProject so the layout doesn't jump when data arrives
export function ProjectCardSkeleton() {
  return (
    <Card className={`${cardClass} py-0`} aria-hidden>
      <div className="px-3 pt-4">
        <Skeleton className="w-full h-56 rounded-lg" />
      </div>
      <CardContent className="px-6 space-y-3">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0 gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </CardFooter>
    </Card>
  );
}

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

// Mirrors EducationCard / AchievementCard
export function QualificationCardSkeleton() {
  return (
    <Card className={cardClass} aria-hidden>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-3/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
