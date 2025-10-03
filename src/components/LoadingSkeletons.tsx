// Loading Skeleton Components
import { cn } from "@/lib/utils";

export function MessageSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-2 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-3 w-16 bg-muted/50 rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-4 w-full bg-muted/70 rounded" />
              <div className="h-4 w-3/4 bg-muted/70 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4 animate-pulse", className)}>
      <div className="space-y-3">
        <div className="h-4 w-2/3 bg-muted rounded" />
        <div className="h-3 w-full bg-muted/70 rounded" />
        <div className="h-3 w-4/5 bg-muted/70 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-16 bg-muted rounded" />
          <div className="h-8 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}

export function ListItemSkeleton({ count = 5 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 animate-pulse">
          <div className="h-10 w-10 rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-muted rounded" />
            <div className="h-3 w-48 bg-muted/70 rounded" />
          </div>
          <div className="h-6 w-6 bg-muted rounded" />
        </div>
      ))}
    </>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-muted" />
        <div className="space-y-2 flex-1">
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-3 w-24 bg-muted/70 rounded" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 animate-pulse">
          <div className="h-4 w-8 bg-muted rounded" />
          <div className="h-4 flex-1 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-4 w-16 bg-muted rounded" />
        </div>
      ))}
    </div>
  );
}
