"use client";

import { create } from "zustand";

interface SidebarStore {
  serverSidebarOpen: boolean;
  channelSidebarOpen: boolean;
  membersSidebarOpen: boolean;
  toggleServerSidebar: () => void;
  toggleChannelSidebar: () => void;
  toggleMembersSidebar: () => void;
  closeAllSidebars: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  serverSidebarOpen: true,
  channelSidebarOpen: true,
  membersSidebarOpen: false,
  toggleServerSidebar: () =>
    set((state) => ({ serverSidebarOpen: !state.serverSidebarOpen })),
  toggleChannelSidebar: () =>
    set((state) => ({ channelSidebarOpen: !state.channelSidebarOpen })),
  toggleMembersSidebar: () =>
    set((state) => ({ membersSidebarOpen: !state.membersSidebarOpen })),
  closeAllSidebars: () =>
    set({ serverSidebarOpen: false, channelSidebarOpen: false, membersSidebarOpen: false }),
}));
