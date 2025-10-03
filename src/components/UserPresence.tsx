// User Presence and Status Components
"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export type UserStatus = 'online' | 'idle' | 'dnd' | 'offline';

interface UserAvatarWithStatusProps {
  avatar: string;
  status?: UserStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

const statusColorMap = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500'
};

export function UserAvatarWithStatus({
  avatar,
  status = 'offline',
  size = 'md',
  showStatus = true,
  className
}: UserAvatarWithStatusProps) {
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(
        sizeMap[size],
        "transition-transform hover:scale-105"
      )}>
        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
          {avatar}
        </AvatarFallback>
      </Avatar>
      {showStatus && (
        <div className={cn(
          "absolute bottom-0 right-0 rounded-full border-2 border-background",
          statusColorMap[status],
          size === 'sm' && "h-2.5 w-2.5",
          size === 'md' && "h-3 w-3",
          size === 'lg' && "h-3.5 w-3.5",
          size === 'xl' && "h-4 w-4"
        )} />
      )}
    </div>
  );
}

interface StatusIndicatorProps {
  status: UserStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

const statusLabels = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline'
};

export function StatusIndicator({ status, showLabel = true, size = 'md' }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "rounded-full",
        statusColorMap[status],
        size === 'sm' ? "h-2 w-2" : "h-2.5 w-2.5"
      )} />
      {showLabel && (
        <span className={cn(
          "font-medium",
          size === 'sm' ? "text-xs" : "text-sm"
        )}>
          {statusLabels[status]}
        </span>
      )}
    </div>
  );
}

interface TypingIndicatorProps {
  users: string[];
  className?: string;
}

export function TypingIndicator({ users, className }: TypingIndicatorProps) {
  if (users.length === 0) return null;

  const displayText = users.length === 1
    ? `${users[0]} is typing...`
    : users.length === 2
    ? `${users[0]} and ${users[1]} are typing...`
    : `${users[0]} and ${users.length - 1} others are typing...`;

  return (
    <div className={cn("flex items-center gap-2 text-sm text-muted-foreground px-4 py-2", className)}>
      <div className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
      </div>
      <span className="font-medium">{displayText}</span>
    </div>
  );
}
