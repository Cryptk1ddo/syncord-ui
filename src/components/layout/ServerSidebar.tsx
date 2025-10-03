"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Hash, Plus, Volume2, Settings as SettingsIcon, X, Compass, Bot, User as UserIcon, MessageSquare, Activity, BarChart3, Users } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";
import { useEffect } from "react";
import Link from "next/link";

interface Server {
  id: string;
  name: string;
  icon?: string;
}

const servers: Server[] = [
  { id: "1", name: "Syncord", icon: "S" },
  { id: "2", name: "Design", icon: "D" },
  { id: "3", name: "Development", icon: "DV" },
  { id: "4", name: "Music", icon: "M" },
];

export function ServerSidebar() {
  const { serverSidebarOpen, toggleServerSidebar } = useSidebarStore();

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Always show on desktop
        if (!serverSidebarOpen) toggleServerSidebar();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [serverSidebarOpen, toggleServerSidebar]);

  return (
    <>
      {/* Mobile Overlay */}
      {serverSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in-scale"
          onClick={toggleServerSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 md:z-0
        flex h-screen w-[72px] flex-col items-center gap-2 bg-background py-3 border-r border-border
        transition-all duration-300 ease-in-out shadow-2xl md:shadow-none
        ${serverSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
      <TooltipProvider delayDuration={0}>
        {/* Home Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-primary hover:bg-primary/90 hover:rounded-[16px] transition-all duration-200 hover:scale-110 active:scale-95 animate-bounce-in shadow-lg hover:shadow-xl"
              >
                <Hash className="h-5 w-5 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            Home
          </TooltipContent>
        </Tooltip>

        <div className="h-[2px] w-8 bg-border rounded-full my-1" />

        {/* Server List */}
        {servers.map((server, idx) => (
          <Tooltip key={server.id}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-12 w-12 rounded-[24px] bg-muted hover:bg-primary hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95 animate-bounce-in stagger-${idx + 1}`}
              >
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-muted group-hover:bg-primary text-foreground group-hover:text-primary-foreground transition-all duration-200 group-hover:scale-105">
                    {server.icon}
                  </AvatarFallback>
                </Avatar>
                {/* Notification indicator */}
                <div className="absolute top-0 right-0 h-3 w-3 bg-destructive rounded-full border-2 border-background opacity-0 group-hover:opacity-0 animate-pulse-glow" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium animate-slide-in-right">
              {server.name}
            </TooltipContent>
          </Tooltip>
        ))}

        {/* Add Server Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-[24px] bg-muted hover:bg-accent hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95 animate-bounce-in stagger-5"
            >
              <Plus className="h-6 w-6 text-accent-foreground group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            Add a Server
          </TooltipContent>
        </Tooltip>

        <div className="h-[2px] w-8 bg-border rounded-full my-1" />

        {/* Discovery Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/discover">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-accent/10 hover:bg-accent hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95"
              >
                <Compass className="h-6 w-6 text-accent-foreground group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            Discover Servers
          </TooltipContent>
        </Tooltip>

        {/* AI Assistant Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/ai-assistant">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-primary/10 hover:bg-primary hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95 relative overflow-hidden"
              >
                <Bot className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110" />
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            AI Assistant
          </TooltipContent>
        </Tooltip>

        <div className="h-[2px] w-8 bg-border rounded-full my-1" />

        {/* Threads Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/threads">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-accent/10 hover:bg-accent hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95"
              >
                <MessageSquare className="h-6 w-6 text-accent-foreground group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            Threads
          </TooltipContent>
        </Tooltip>

        {/* Activities Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/activities">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-accent/10 hover:bg-accent hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95"
              >
                <Activity className="h-6 w-6 text-accent-foreground group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium animate-slide-in-right">
            Activity Feed
          </TooltipContent>
        </Tooltip>

        {/* Analytics Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/analytics">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-accent/10 hover:bg-accent hover:rounded-[16px] transition-all duration-200 group hover:scale-110 active:scale-95"
              >
                <BarChart3 className="h-6 w-6 text-accent-foreground group-hover:text-accent-foreground" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            Analytics
          </TooltipContent>
        </Tooltip>

        <div className="flex-1" />

        {/* Friends Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/friends">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-accent/10 hover:bg-accent hover:rounded-[16px] transition-all duration-200 group relative"
              >
                <Users className="h-6 w-6 text-accent-foreground group-hover:text-accent-foreground" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            Friends
          </TooltipContent>
        </Tooltip>

        {/* Profile Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-muted hover:bg-accent hover:rounded-[16px] transition-all duration-200 group"
              >
                <UserIcon className="h-6 w-6 text-accent-foreground group-hover:text-accent-foreground" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            My Profile
          </TooltipContent>
        </Tooltip>

        {/* Settings Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-[24px] bg-muted hover:bg-accent hover:rounded-[16px] transition-all duration-200 group"
              >
                <SettingsIcon className="h-6 w-6 text-accent-foreground group-hover:text-accent-foreground" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            Settings
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    </>
  );
}
