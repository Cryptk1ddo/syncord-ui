// Enhanced Message Component with Reactions and Better Interactions
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Reply, Smile, Pin, Copy, Edit, Trash2, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Reaction {
  emoji: string;
  count: number;
  users: string[];
  reacted: boolean;
}

interface MessageProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  edited?: boolean;
  pinned?: boolean;
  reactions?: Reaction[];
  isBot?: boolean;
  repliedTo?: {
    author: string;
    content: string;
  };
}

export function EnhancedMessage({ 
  author, 
  content, 
  timestamp, 
  avatar, 
  edited,
  pinned,
  reactions = [],
  isBot = false,
  repliedTo
}: MessageProps) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [localReactions, setLocalReactions] = useState(reactions);

  const quickEmojis = ['👍', '❤️', '😂', '🎉', '🤔', '👀'];

  const handleReaction = (emoji: string) => {
    setLocalReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        if (existing.reacted) {
          // Remove reaction
          return existing.count === 1
            ? prev.filter((r) => r.emoji !== emoji)
            : prev.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count - 1, reacted: false }
                  : r
              );
        } else {
          // Add reaction
          return prev.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.count + 1, reacted: true }
              : r
          );
        }
      } else {
        // New reaction
        return [...prev, { emoji, count: 1, users: ['You'], reacted: true }];
      }
    });
    setShowReactionPicker(false);
  };

  return (
    <div className={cn(
      "flex gap-4 -mx-4 px-4 py-2 group relative transition-colors duration-150",
      "hover:bg-muted/50",
      pinned && "bg-accent/5 border-l-2 border-l-primary"
    )}>
      {pinned && (
        <div className="absolute top-0 left-4 -mt-1">
          <Pin className="h-3 w-3 text-primary fill-primary" />
        </div>
      )}

      <Avatar className="h-10 w-10 mt-1 transition-transform group-hover:scale-105">
        <AvatarFallback className={cn(
          "text-sm font-semibold transition-colors",
          isBot ? "bg-blue-500 text-white" : "bg-primary text-primary-foreground"
        )}>
          {avatar}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        {/* Replied To Context */}
        {repliedTo && (
          <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <Reply className="h-3 w-3" />
            <span className="font-medium">{repliedTo.author}</span>
            <span className="truncate">{repliedTo.content}</span>
          </div>
        )}

        {/* Author & Timestamp */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-semibold text-sm hover:underline cursor-pointer transition-all">
            {author}
          </span>
          {isBot && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-blue-500 text-white rounded">
              BOT
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {timestamp}
            {edited && <span className="ml-1 text-[10px] opacity-60">(edited)</span>}
          </span>
        </div>

        {/* Message Content */}
        <p className="text-sm leading-relaxed mt-0.5 break-words whitespace-pre-wrap">
          {content}
        </p>

        {/* Reactions */}
        {localReactions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {localReactions.map((reaction) => (
              <button
                key={reaction.emoji}
                onClick={() => handleReaction(reaction.emoji)}
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                  "transition-all duration-200 hover:scale-105",
                  "border border-border hover:border-primary/50",
                  reaction.reacted
                    ? "bg-primary/10 border-primary"
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <span>{reaction.emoji}</span>
                <span className={cn(
                  "font-medium",
                  reaction.reacted ? "text-primary" : "text-muted-foreground"
                )}>
                  {reaction.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Message Actions (shown on hover) */}
      <div className="absolute -top-3 right-4 hidden group-hover:flex items-center gap-1 bg-card border border-border rounded-lg shadow-lg px-1 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
        {/* Emoji Reaction */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent transition-all hover:scale-110"
            onClick={() => setShowReactionPicker(!showReactionPicker)}
          >
            <Smile className="h-4 w-4" />
          </Button>
          
          {/* Quick Emoji Picker */}
          {showReactionPicker && (
            <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-lg shadow-xl p-2 flex gap-1 z-50 animate-in fade-in zoom-in-95 duration-200">
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-accent rounded transition-all hover:scale-125"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reply */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:bg-accent transition-all hover:scale-110"
        >
          <Reply className="h-4 w-4" />
        </Button>

        {/* More Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-accent transition-all hover:scale-110"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Pin className="h-4 w-4 mr-2" />
              Pin Message
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Copy Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Message
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground">
              <Flag className="h-4 w-4 mr-2" />
              Report Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
