"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: number;
  disabled?: boolean;
}

export function Card3D({ 
  children, 
  intensity = 15, 
  disabled = false,
  className,
  ...props 
}: Card3DProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (inverted for natural effect)
    const rotateY = ((x - centerX) / centerX) * intensity;
    const rotateX = ((centerY - y) / centerY) * intensity;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      style={{
        transform: disabled 
          ? undefined 
          : `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovering ? 'scale(1.02)' : 'scale(1)'}`,
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      {children}
      
      {/* Shine effect */}
      {!disabled && isHovering && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${((rotation.y / intensity + 1) / 2) * 100}% ${((rotation.x / intensity + 1) / 2) * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}

// Parallax container for scroll-based effects
export function ParallaxContainer({ 
  children, 
  speed = 0.5,
  className,
}: { 
  children: React.ReactNode; 
  speed?: number;
  className?: string;
}) {
  const [offset, setOffset] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const parallax = scrolled * speed;
      
      setOffset(parallax);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Reveal on scroll
export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const directionClasses = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        !isVisible && `opacity-0 ${directionClasses[direction]}`,
        isVisible && "opacity-100 translate-x-0 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}
