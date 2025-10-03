"use client";

import { Hash, Volume2, ChevronDown, Plus, Settings, Users, Bell, X, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSidebarStore } from "@/store/sidebar-store";
import Link from "next/link";

interface Channel {
  id: string;
  name: string;
  type: "text" | "voice";
}

const textChannels: Channel[] = [
  { id: "1", name: "general", type: "text" },
  { id: "2", name: "random", type: "text" },
  { id: "3", name: "announcements", type: "text" },
];

const voiceChannels: Channel[] = [
  { id: "4", name: "General Voice", type: "voice" },
  { id: "5", name: "Gaming", type: "voice" },
];

export function ChannelSidebar() {
  const { channelSidebarOpen, toggleChannelSidebar } = useSidebarStore();

  return (
    <>
      {/* Mobile Overlay */}
      {channelSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in-scale"
          onClick={toggleChannelSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative z-50 md:z-0
        flex h-screen w-[240px] flex-col bg-card border-r border-border
        transition-all duration-300 ease-in-out shadow-2xl md:shadow-none backdrop-blur-sm
        ${channelSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Server Header - Golden ratio: 60px height */}
        <div className="flex h-[60px] items-center justify-between px-4 border-b border-border">
          <h2 className="font-bold text-base tracking-tight">Syncord</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 md:hidden"
              onClick={toggleChannelSidebar}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-[2px]">
          {/* Text Channels Section */}
          <div className="py-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <ChevronDown className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-180" />
              TEXT CHANNELS
            </Button>
            {textChannels.map((channel, idx) => (
              <Button
                key={channel.id}
                variant="ghost"
                className={`w-full justify-start h-8 px-2 text-sm font-medium hover:bg-muted hover:pl-3 transition-all duration-200 group animate-slide-in-left stagger-${idx + 1}`}
              >
                <Hash className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">{channel.name}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 group"
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Add Channel
            </Button>
          </div>

          <Separator className="my-2" />

          {/* Voice Channels Section */}
          <div className="py-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-8 px-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <ChevronDown className="h-3 w-3 mr-1 transition-transform duration-200 group-hover:rotate-180" />
              VOICE CHANNELS
            </Button>
            {voiceChannels.map((channel, idx) => (
              <Link href="/voice-room" key={channel.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-8 px-2 text-sm font-medium hover:bg-muted hover:pl-3 transition-all duration-200 group animate-slide-in-left stagger-${idx + 4}`}
                >
                  <Volume2 className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-foreground group-hover:scale-110 transition-all duration-200" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">{channel.name}</span>
                  {/* Video icon appears on hover */}
                  <Video className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* User Bar - Golden ratio: ~52px height */}
      <div className="flex h-[52px] items-center justify-between px-2 bg-muted/30 border-t border-border hover:bg-muted/50 transition-all duration-300 group/userbar">
        <div className="flex items-center gap-2 min-w-0 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center group-hover/userbar:scale-110 transition-transform duration-300 relative">
            <span className="text-xs font-bold text-primary-foreground">U</span>
            {/* Online status indicator */}
            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-muted/30 animate-pulse-glow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate group-hover/userbar:text-primary transition-colors duration-200">Username</p>
            <p className="text-xs text-muted-foreground truncate">#0001</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/settings">
            <Settings className="h-4 w-4 group-hover/settings:rotate-90 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
