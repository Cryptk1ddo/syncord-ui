'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-300 ${
        isTransitioning 
          ? 'opacity-0 scale-95' 
          : 'opacity-100 scale-100 animate-fade-in-scale'
      }`}
    >
      {children}
    </div>
  );
}

// Fade transition
export function FadeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

// Slide transition
export function SlideTransition({ 
  children, 
  direction = 'right' 
}: PageTransitionProps & { direction?: 'left' | 'right' | 'up' | 'down' }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  const directions = {
    left: 'translate-x-full',
    right: '-translate-x-full',
    up: 'translate-y-full',
    down: '-translate-y-full',
  };

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible 
          ? 'translate-x-0 translate-y-0 opacity-100' 
          : `${directions[direction]} opacity-0`
      }`}
    >
      {children}
    </div>
  );
}

// Scale and fade
export function ScaleFadeTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className="animate-fade-in-scale"
    >
      {children}
    </div>
  );
}
