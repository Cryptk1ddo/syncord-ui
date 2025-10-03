"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  users: string[];
  className?: string;
}

export function TypingIndicator({ users, className }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayText = React.useMemo(() => {
    if (users.length === 1) {
      return `${users[0]} is typing`;
    } else if (users.length === 2) {
      return `${users[0]} and ${users[1]} are typing`;
    } else if (users.length === 3) {
      return `${users[0]}, ${users[1]}, and ${users[2]} are typing`;
    } else {
      return `${users[0]}, ${users[1]}, and ${users.length - 2} others are typing`;
    }
  }, [users]);

  return (
    <div className={cn("flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground animate-slide-up", className)}>
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: "200ms" }} />
        <span className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-dot" style={{ animationDelay: "400ms" }} />
      </div>
      <span className="font-medium">{displayText}</span>
    </div>
  );
}

// Hook to manage typing state
export function useTypingIndicator(channelId: string, userId: string) {
  const [isTyping, setIsTyping] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const startTyping = React.useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      // In a real app, emit typing event to server
      console.log(`User ${userId} started typing in ${channelId}`);
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Stop typing after 3 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      console.log(`User ${userId} stopped typing in ${channelId}`);
    }, 3000);
  }, [isTyping, channelId, userId]);

  const stopTyping = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsTyping(false);
    console.log(`User ${userId} stopped typing in ${channelId}`);
  }, [channelId, userId]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isTyping, startTyping, stopTyping };
}
