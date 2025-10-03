"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VoiceActivityProps {
  isSpeaking: boolean;
  username: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function VoiceActivity({ isSpeaking, username, className, size = "md" }: VoiceActivityProps) {
  const sizeClasses = {
    sm: "w-16 h-3",
    md: "w-20 h-4",
    lg: "w-24 h-5",
  };

  const barCount = size === "sm" ? 3 : size === "md" ? 5 : 7;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex items-end justify-center gap-0.5", sizeClasses[size])}>
        {Array.from({ length: barCount }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "flex-1 rounded-full transition-all duration-150",
              isSpeaking
                ? "bg-green-500 animate-voice-bar"
                : "bg-muted-foreground/30"
            )}
            style={{
              height: isSpeaking ? "100%" : "30%",
              animationDelay: `${idx * 100}ms`,
            }}
          />
        ))}
      </div>
      {username && (
        <span className={cn(
          "text-sm font-medium transition-colors duration-200",
          isSpeaking ? "text-green-500" : "text-muted-foreground"
        )}>
          {username}
        </span>
      )}
    </div>
  );
}

// Compact version for avatars
export function VoiceActivityRing({ isSpeaking, size = 48 }: { isSpeaking: boolean; size?: number }) {
  return (
    <>
      {isSpeaking && (
        <>
          <span
            className="absolute inset-0 rounded-full border-2 border-green-500 animate-voice-ring"
            style={{ width: size, height: size }}
          />
          <span
            className="absolute inset-0 rounded-full border-2 border-green-500 animate-voice-ring"
            style={{ 
              width: size, 
              height: size,
              animationDelay: "0.3s"
            }}
          />
        </>
      )}
    </>
  );
}
