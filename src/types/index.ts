export type MessageType = {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  avatar: string;
  edited?: boolean;
};

export type ChannelType = {
  id: string;
  name: string;
  type: "text" | "voice";
  category?: string;
};

export type ServerType = {
  id: string;
  name: string;
  icon?: string;
  iconUrl?: string;
};

export type MemberType = {
  id: string;
  name: string;
  username: string;
  discriminator: string;
  status: "online" | "idle" | "dnd" | "offline";
  avatar: string;
  avatarUrl?: string;
  roles?: string[];
};

export type UserType = {
  id: string;
  name: string;
  username: string;
  discriminator: string;
  avatar: string;
  avatarUrl?: string;
};
