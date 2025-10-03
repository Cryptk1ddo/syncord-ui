'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'avatar';
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({ 
  className, 
  variant = 'rectangular',
  animation = 'wave'
}: SkeletonProps) {
  const baseClasses = "bg-muted rounded";
  
  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full",
    rectangular: "rounded-md",
    avatar: "h-10 w-10 rounded-full"
  };

  const animationClasses = {
    pulse: "animate-pulse-glow",
    wave: "animate-skeleton",
    none: ""
  };

  return (
    <div 
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
}

// Pre-built skeleton patterns
export function MessageSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-2 animate-fade-in-scale">
      <Skeleton variant="avatar" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function ChannelSkeleton() {
  return (
    <div className="space-y-1 p-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 animate-fade-in-scale stagger-${i + 1}`}>
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

export function MemberSkeleton() {
  return (
    <div className="space-y-1 p-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`flex items-center gap-2 px-2 py-1.5 animate-fade-in-scale stagger-${i + 1}`}>
          <Skeleton variant="avatar" className="h-8 w-8" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ServerSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 py-3">
      {[...Array(6)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={`h-12 w-12 rounded-[24px] animate-bounce-in stagger-${i + 1}`} 
        />
      ))}
    </div>
  );
}
