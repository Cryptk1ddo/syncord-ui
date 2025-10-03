export const mockServers = [
  { id: "1", name: "Syncord", icon: "S", hasNotification: true, unreadCount: 3 },
  { id: "2", name: "Design", icon: "D", hasNotification: false, unreadCount: 0 },
  { id: "3", name: "Development", icon: "DV", hasNotification: true, unreadCount: 12 },
  { id: "4", name: "Music", icon: "M", hasNotification: false, unreadCount: 0 },
  { id: "5", name: "Gaming", icon: "G", hasNotification: true, unreadCount: 5 },
];

export const mockChannels = {
  text: [
    { id: "1", name: "general", hasUnread: true },
    { id: "2", name: "announcements", hasUnread: false, pinned: true },
    { id: "3", name: "dev-help", hasUnread: true },
    { id: "4", name: "design", hasUnread: false },
    { id: "5", name: "random", hasUnread: false },
  ],
  voice: [
    { id: "v1", name: "General Voice", userCount: 3 },
    { id: "v2", name: "Meeting Room", userCount: 0 },
    { id: "v3", name: "Music Lounge", userCount: 7 },
  ]
};

export const mockMembers = {
  online: [
    { id: "1", name: "Alice", avatar: "A", status: "online", activity: "Playing Cyberpunk 2077" },
    { id: "2", name: "Bob", avatar: "B", status: "online", activity: "Listening to Spotify" },
    { id: "3", name: "Charlie", avatar: "C", status: "online", activity: null },
    { id: "4", name: "Diana", avatar: "D", status: "idle", activity: "Away" },
    { id: "5", name: "Eve", avatar: "E", status: "dnd", activity: "In a meeting" },
  ],
  offline: [
    { id: "6", name: "Frank", avatar: "F", status: "offline", activity: null },
    { id: "7", name: "Grace", avatar: "G", status: "offline", activity: null },
    { id: "8", name: "Henry", avatar: "H", status: "offline", activity: null },
  ]
};

export const activityStatuses = {
  online: { color: "bg-green-500", label: "Online" },
  idle: { color: "bg-yellow-500", label: "Idle" },
  dnd: { color: "bg-red-500", label: "Do Not Disturb" },
  offline: { color: "bg-gray-500", label: "Offline" },
};

export const APP_NAME = "Syncord";
export const APP_DESCRIPTION = "A next-generation Discord clone";
