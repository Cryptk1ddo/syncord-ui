"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface MessageReactionsProps {
  reactions?: Reaction[];
  onReact?: (emoji: string) => void;
  onRemoveReaction?: (emoji: string) => void;
}

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
  reacted: boolean;
}

const COMMON_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🎉", "🔥", "👀"];

export function MessageReactions({
  reactions = [],
  onReact,
  onRemoveReaction,
}: MessageReactionsProps) {
  const [showPicker, setShowPicker] = React.useState(false);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showPicker]);

  const handleReactionClick = (reaction: Reaction) => {
    if (reaction.reacted) {
      onRemoveReaction?.(reaction.emoji);
    } else {
      onReact?.(reaction.emoji);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    onReact?.(emoji);
    setShowPicker(false);
  };

  return (
    <div className="flex items-center gap-1 mt-1 flex-wrap">
      {/* Existing Reactions */}
      {reactions.map((reaction, idx) => (
        <button
          key={`${reaction.emoji}-${idx}`}
          onClick={() => handleReactionClick(reaction)}
          className={cn(
            "group relative flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200",
            "hover:scale-110 active:scale-95",
            reaction.reacted
              ? "bg-primary/10 border border-primary text-primary"
              : "bg-muted border border-border hover:border-primary/30"
          )}
          title={reaction.users.join(", ")}
        >
          <span className="transform transition-transform duration-200 group-hover:scale-125">
            {reaction.emoji}
          </span>
          <span className={cn(
            "tabular-nums transition-colors duration-200",
            reaction.reacted ? "text-primary" : "text-muted-foreground"
          )}>
            {reaction.count}
          </span>
          
          {/* Reaction Bounce Animation */}
          {reaction.reacted && (
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-0" />
          )}
        </button>
      ))}

      {/* Add Reaction Button */}
      <div className="relative" ref={pickerRef}>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200",
            "hover:bg-muted hover:scale-110 active:scale-95",
            "border border-transparent hover:border-border",
            showPicker && "bg-muted border-border scale-110"
          )}
          title="Add reaction"
        >
          <Plus className="w-3.5 h-3.5 text-muted-foreground" />
        </button>

        {/* Emoji Picker */}
        {showPicker && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-popover border border-border rounded-lg shadow-2xl animate-scale-in origin-bottom-left z-50">
            <div className="grid grid-cols-4 gap-1">
              {COMMON_EMOJIS.map((emoji, idx) => (
                <button
                  key={emoji}
                  onClick={() => handleEmojiSelect(emoji)}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center text-xl rounded-md",
                    "hover:bg-accent transition-all duration-150 hover:scale-125 active:scale-95",
                    "animate-scale-in"
                  )}
                  style={{
                    animationDelay: `${idx * 30}ms`,
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Animated Reaction Float Effect
export function AnimatedReaction({ emoji, onComplete }: { emoji: string; onComplete: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute pointer-events-none animate-reaction-float text-2xl">
      {emoji}
    </div>
  );
}
