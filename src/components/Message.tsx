"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Reply, Smile, Pin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MessageProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  edited?: boolean;
}

export function Message({ author, content, timestamp, avatar, edited }: MessageProps) {
  return (
    <div className="flex gap-4 hover:bg-muted/50 -mx-4 px-4 py-2 group relative">
      <Avatar className="h-10 w-10 mt-1">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
          {avatar}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm hover:underline cursor-pointer">
            {author}
          </span>
          <span className="text-xs text-muted-foreground">
            {timestamp}
            {edited && <span className="ml-1 text-[10px]">(edited)</span>}
          </span>
        </div>
        <p className="text-sm leading-relaxed mt-0.5 break-words">{content}</p>
      </div>

      {/* Message Actions (shown on hover) */}
      <div className="absolute top-[-12px] right-4 hidden group-hover:flex items-center gap-1 bg-card border border-border rounded-md shadow-md">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Smile className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Reply className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Pin className="h-4 w-4 mr-2" />
              Pin Message
            </DropdownMenuItem>
            <DropdownMenuItem>Edit Message</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete Message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
