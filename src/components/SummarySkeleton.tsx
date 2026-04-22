import { Skeleton } from "./ui/skeleton";

export const SummarySkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-9/10" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-11/12" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
};
