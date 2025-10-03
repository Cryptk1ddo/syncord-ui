// Advanced Animation Utilities and Transitions
import { cn } from "@/lib/utils";

// Fade in animation variants
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Slide animations
export const slideIn = {
  fromLeft: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  },
  fromRight: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  fromTop: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  },
  fromBottom: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  }
};

// Scale animations
export const scale = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 }
};

// Stagger children animation
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Page transition wrapper
export function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
      {children}
    </div>
  );
}

// Shimmer loading effect
export function ShimmerEffect({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

// Pulse animation component
export function PulseRing({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-3 w-3", className)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
    </span>
  );
}

// Gradient border animation
export function AnimatedBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative p-[2px] rounded-lg overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] animate-gradient" />
      <div className="relative bg-background rounded-lg">
        {children}
      </div>
    </div>
  );
}
