import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="table-shell rim-surface elev-surface overflow-hidden">
      <div className="border-b border-border px-4 py-3">
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="space-y-3 px-4 py-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}
