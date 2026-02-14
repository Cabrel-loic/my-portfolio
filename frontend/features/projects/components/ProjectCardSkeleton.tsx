"use client";

import { CardGlow } from "@/components/ui/CardGlow";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectCardSkeleton() {
  return (
    <CardGlow className="p-0">
      <Skeleton className="project-card-skeleton aspect-video w-full rounded-t-2xl rounded-b-none" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-full rounded" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </CardGlow>
  );
}
