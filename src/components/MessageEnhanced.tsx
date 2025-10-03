'use client';

import { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Smile,
  Reply,
  Edit,
  Trash2,
  MoreVertical,
  Pin,
  Copy
} from 'lucide-react';

interface MessageProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  edited?: boolean;
}

export function Message({ id, author, content, timestamp, avatar, edited }: MessageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const reactions = [
    { emoji: '👍', count: 3, reacted: true },
    { emoji: '❤️', count: 1, reacted: false },
  ];

  return (
    <div 
      className="group relative flex gap-3 px-4 py-2 hover:bg-accent/5 transition-all duration-200 animate-slide-in-left hover:pl-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover Actions */}
      {isHovered && (
        <div className="absolute -top-4 right-4 z-10 flex items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-lg animate-bounce-in">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn"
            title="Add Reaction"
          >
            <Smile className="h-4 w-4 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-200" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn"
            title="Reply"
          >
            <Reply className="h-4 w-4 group-hover/btn:-scale-x-100 transition-transform duration-200" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn"
            title="Edit"
          >
            <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn"
            title="Pin"
          >
            <Pin className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-200" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200"
            title="More"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-destructive/10 text-destructive hover:scale-110 active:scale-95 transition-all duration-200 group/del"
            title="Delete"
          >
            <Trash2 className="h-4 w-4 group-hover/del:scale-110 transition-transform duration-200" />
          </Button>
        </div>
      )}

      {/* Avatar */}
      <Avatar className="h-10 w-10 flex-shrink-0 cursor-pointer hover:scale-110 hover:ring-2 hover:ring-primary/50 transition-all duration-300">
        <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground font-semibold text-lg">
          {avatar}
        </div>
      </Avatar>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm hover:underline cursor-pointer transition-all duration-200 hover:text-primary">
            {author}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp}
          </span>
          {edited && (
            <span className="text-xs text-muted-foreground animate-slide-in-left">(edited)</span>
          )}
        </div>
        
        <div className="text-sm text-foreground break-words">
          {content}
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {reactions.map((reaction, index) => (
              <button
                key={index}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-200 hover:scale-110 active:scale-95 ${
                  reaction.reacted
                    ? 'bg-primary/10 border border-primary/20 hover:bg-primary/20 shadow-sm'
                    : 'bg-muted hover:bg-accent'
                }`}
              >
                <span className="transition-transform duration-200 hover:scale-125">{reaction.emoji}</span>
                <span className="font-medium">{reaction.count}</span>
              </button>
            ))}
            <button className="flex items-center justify-center h-6 w-6 rounded-md bg-muted hover:bg-accent transition-all duration-200 hover:scale-110 active:scale-95 group/add">
              <Smile className="h-3.5 w-3.5 group-hover/add:scale-110 group-hover/add:rotate-12 transition-all duration-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
