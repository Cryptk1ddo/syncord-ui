"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";

interface Member {
  id: string;
  name: string;
  status: "online" | "idle" | "dnd" | "offline";
  avatar: string;
}

const members: Member[] = [
  { id: "1", name: "Alice", status: "online", avatar: "A" },
  { id: "2", name: "Bob", status: "online", avatar: "B" },
  { id: "3", name: "Charlie", status: "idle", avatar: "C" },
  { id: "4", name: "David", status: "dnd", avatar: "D" },
  { id: "5", name: "Eve", status: "offline", avatar: "E" },
];

const statusColors = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-muted-foreground",
};

export function MembersSidebar() {
  const { membersSidebarOpen, toggleMembersSidebar } = useSidebarStore();

  return (
    <>
      {/* Mobile Overlay */}
      {membersSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in-scale"
          onClick={toggleMembersSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:relative right-0 z-50 md:z-0
        flex h-screen w-[240px] flex-col bg-card border-l border-border
        transition-all duration-300 ease-in-out shadow-2xl md:shadow-none backdrop-blur-sm
        ${membersSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Members count - Golden ratio: 60px height */}
        <div className="flex h-[60px] items-center justify-between px-4 border-b border-border hover:bg-muted/30 transition-all duration-300 group/header">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover/header:text-foreground transition-colors duration-200 animate-slide-down">
            Members — <span className="inline-block group-hover/header:scale-110 transition-transform duration-200">{members.filter((m) => m.status !== "offline").length}</span>
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 md:hidden hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/close"
            onClick={toggleMembersSidebar}
          >
            <X className="h-4 w-4 group-hover/close:rotate-90 transition-transform duration-300" />
          </Button>
        </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {/* Online Members */}
          <div className="mb-4 animate-fade-in-scale">
            <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-200 cursor-default">
              Online — <span className="inline-block">{members.filter((m) => m.status === "online").length}</span>
            </h4>
            <div className="space-y-1">
              {members
                .filter((m) => m.status === "online")
                .map((member, idx) => (
                  <div
                    key={member.id}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer group transition-all duration-200 hover:pl-3 hover:shadow-md ripple-container glow-on-hover animate-slide-in-left stagger-${idx + 1}`}
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 group-hover:scale-110 group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold group-hover:scale-105 transition-transform duration-300">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColors[member.status]} group-hover:scale-110 transition-transform duration-200`}
                      />
                      {/* Animated status ping for online users */}
                      <span
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statusColors[member.status]} animate-status-ping`}
                      />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">{member.name}</span>
                    {/* Online indicator dot that pulses */}
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 animate-pulse-glow transition-opacity duration-300" />
                  </div>
                ))}
            </div>
          </div>

          {/* Offline Members */}
          {members.filter((m) => m.status === "offline").length > 0 && (
            <div className="animate-fade-in-scale" style={{animationDelay: '0.2s'}}>
              <h4 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-200 cursor-default">
                Offline — <span className="inline-block">{members.filter((m) => m.status === "offline").length}</span>
              </h4>
              <div className="space-y-1">
                {members
                  .filter((m) => m.status === "offline")
                  .map((member, idx) => (
                    <div
                      key={member.id}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer opacity-50 hover:opacity-100 group transition-all duration-300 hover:pl-3 ripple-container animate-slide-in-left stagger-${idx + 4}`}
                    >
                      <div className="relative">
                        <Avatar className="h-8 w-8 group-hover:scale-110 group-hover:ring-2 group-hover:ring-muted-foreground/30 transition-all duration-300">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold group-hover:scale-105 transition-transform duration-300">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${statusColors[member.status]} group-hover:scale-110 transition-transform duration-200`}
                        />
                      </div>
                      <span className="text-sm font-medium group-hover:text-foreground transition-colors duration-200">{member.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
    </>
  );
}
