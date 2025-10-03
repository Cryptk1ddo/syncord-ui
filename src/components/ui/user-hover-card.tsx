'use client';

import { ReactNode, useState } from 'react';
import { Avatar, AvatarFallback } from './avatar';
import { Button } from './button';
import { MessageSquare, UserPlus, MoreHorizontal, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserHoverCardProps {
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  roles?: string[];
  joinedAt?: string;
  children: ReactNode;
}

const statusConfig = {
  online: { color: 'bg-green-500', label: 'Online', glow: 'shadow-green-500/50' },
  idle: { color: 'bg-yellow-500', label: 'Idle', glow: 'shadow-yellow-500/50' },
  dnd: { color: 'bg-red-500', label: 'Do Not Disturb', glow: 'shadow-red-500/50' },
  offline: { color: 'bg-muted-foreground', label: 'Offline', glow: '' },
};

export function UserHoverCard({ 
  name, 
  username, 
  avatar, 
  status, 
  roles = [],
  joinedAt = 'Member since 2024',
  children 
}: UserHoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  let hoverTimeout: NodeJS.Timeout;
  let leaveTimeout: NodeJS.Timeout;

  const handleMouseEnter = (e: React.MouseEvent) => {
    clearTimeout(leaveTimeout);
    hoverTimeout = setTimeout(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({
        x: rect.right + 10,
        y: rect.top,
      });
      setIsVisible(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    leaveTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  const statusInfo = statusConfig[status];

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        {children}
      </div>

      {isVisible && (
        <div
          className="fixed z-[60] pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="pointer-events-auto w-80 bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-notification-pop">
            {/* Banner */}
            <div className="h-16 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
            </div>

            {/* Content */}
            <div className="px-4 pb-4 -mt-8 relative">
              {/* Avatar */}
              <div className="relative inline-block mb-3">
                <Avatar className={cn(
                  "h-20 w-20 border-4 border-card ring-2 ring-border transition-all duration-300 hover:scale-105",
                  statusInfo.glow && "shadow-lg"
                )}>
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 flex items-center gap-1">
                  <span className={cn(
                    "h-5 w-5 rounded-full border-4 border-card",
                    statusInfo.color
                  )} />
                  {status === 'online' && (
                    <span className={cn(
                      "absolute h-5 w-5 rounded-full animate-status-ping",
                      statusInfo.color
                    )} />
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="mb-3">
                <h3 className="font-bold text-lg leading-none mb-1 hover:text-primary transition-colors cursor-pointer">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground">{username}</p>
              </div>

              {/* Status */}
              <div className="mb-3 px-3 py-2 rounded-md bg-muted/50 border border-border">
                <div className="flex items-center gap-2 text-sm">
                  <div className={cn("h-2 w-2 rounded-full", statusInfo.color)} />
                  <span className="font-medium">{statusInfo.label}</span>
                </div>
              </div>

              {/* Roles */}
              {roles.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <Shield className="h-3 w-3" />
                    <span className="font-semibold uppercase">Roles</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer animate-bounce-in"
                        style={{ animationDelay: `${idx * 0.05}s` }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Member Since */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Clock className="h-3 w-3" />
                <span>{joinedAt}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                  <MessageSquare className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  Message
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                  <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                  <MoreHorizontal className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
