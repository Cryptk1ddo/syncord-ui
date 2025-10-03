"use client";

import { ServerSidebar } from "@/components/layout/ServerSidebar";
import { ChannelSidebar } from "@/components/layout/ChannelSidebar";
import { ChatArea } from "@/components/layout/ChatArea";
import { MembersSidebar } from "@/components/layout/MembersSidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { useEffect } from "react";

export default function ChatPage() {
  const { closeAllSidebars } = useSidebarStore();

  // Close all sidebars on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        closeAllSidebars();
      }
    };
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeAllSidebars]);

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Server Sidebar - 72px (Golden ratio derived) */}
      <ServerSidebar />
      
      {/* Channel Sidebar - 240px (Golden ratio: 240/148 ≈ 1.62) */}
      <ChannelSidebar />
      
      {/* Main Chat Area - Flex grow */}
      <ChatArea />
      
      {/* Members Sidebar - 240px (maintaining symmetry) */}
      <MembersSidebar />
    </div>
  );
}
