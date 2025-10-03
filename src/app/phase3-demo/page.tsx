"use client";

import * as React from "react";
import { 
  Copy, 
  Edit, 
  Trash2, 
  Pin, 
  Reply, 
  MoreHorizontal,
  Home,
  Settings,
  User,
  LogOut,
  Hash,
  AtSign,
  FileText,
  Image as ImageIcon,
  Video,
  Mic
} from "lucide-react";
import { ContextMenu } from "@/components/ui/context-menu";
import { CommandPalette } from "@/components/ui/command-palette";
import { MessageReactions } from "@/components/ui/message-reactions";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { VoiceActivity, VoiceActivityRing } from "@/components/ui/voice-activity";
import { Card3D, RevealOnScroll } from "@/components/ui/3d-effects";
import { EnhancedSearch } from "@/components/ui/enhanced-search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Phase3Demo() {
  const [reactions, setReactions] = React.useState([
    { emoji: "👍", count: 3, users: ["Alice", "Bob", "Charlie"], reacted: false },
    { emoji: "❤️", count: 1, users: ["Alice"], reacted: true },
  ]);
  
  const [typingUsers, setTypingUsers] = React.useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const handleReact = (emoji: string) => {
    setReactions((prev) => {
      const existing = prev.find((r) => r.emoji === emoji);
      if (existing) {
        return prev.map((r) =>
          r.emoji === emoji
            ? { ...r, count: r.count + 1, users: [...r.users, "You"], reacted: true }
            : r
        );
      }
      return [...prev, { emoji, count: 1, users: ["You"], reacted: true }];
    });
  };

  const handleRemoveReaction = (emoji: string) => {
    setReactions((prev) =>
      prev.map((r) =>
        r.emoji === emoji
          ? { ...r, count: r.count - 1, users: r.users.filter((u) => u !== "You"), reacted: false }
          : r
      ).filter((r) => r.count > 0)
    );
  };

  const messageContextItems = [
    { label: "Copy Message", icon: <Copy className="w-4 h-4" />, onClick: () => alert("Copied!") },
    { label: "Edit Message", icon: <Edit className="w-4 h-4" />, onClick: () => alert("Edit"), shortcut: "E" },
    { label: "Pin Message", icon: <Pin className="w-4 h-4" />, onClick: () => alert("Pinned") },
    { label: "Reply", icon: <Reply className="w-4 h-4" />, onClick: () => alert("Reply"), shortcut: "R" },
    { divider: true },
    { label: "Delete Message", icon: <Trash2 className="w-4 h-4" />, onClick: () => alert("Deleted"), variant: "danger" as const },
  ];

  const commands = [
    { 
      id: "home", 
      label: "Go Home", 
      description: "Navigate to home page",
      icon: <Home className="w-4 h-4" />, 
      category: "Navigation",
      shortcut: "⌘H",
      onExecute: () => alert("Navigate to Home") 
    },
    { 
      id: "settings", 
      label: "Settings", 
      description: "Open settings panel",
      icon: <Settings className="w-4 h-4" />, 
      category: "Navigation",
      shortcut: "⌘,",
      onExecute: () => alert("Open Settings") 
    },
    { 
      id: "profile", 
      label: "View Profile", 
      description: "Open your profile",
      icon: <User className="w-4 h-4" />, 
      category: "Navigation",
      shortcut: "⌘P",
      onExecute: () => alert("View Profile") 
    },
    { 
      id: "logout", 
      label: "Log Out", 
      description: "Sign out of your account",
      icon: <LogOut className="w-4 h-4" />, 
      category: "Account",
      onExecute: () => alert("Logged Out") 
    },
    { 
      id: "mention", 
      label: "Mention User", 
      description: "Add @mention to message",
      icon: <AtSign className="w-4 h-4" />, 
      category: "Actions",
      shortcut: "@",
      onExecute: () => alert("Mention") 
    },
    { 
      id: "channel", 
      label: "Browse Channels", 
      description: "View all channels",
      icon: <Hash className="w-4 h-4" />, 
      category: "Actions",
      shortcut: "⌘K",
      onExecute: () => alert("Browse Channels") 
    },
  ];

  const demoSearchResults = [
    { id: "1", title: "General Chat", description: "Main discussion channel", category: "Channels", icon: <Hash className="w-4 h-4" />, onClick: () => {} },
    { id: "2", title: "Announcements", description: "Important updates", category: "Channels", icon: <Hash className="w-4 h-4" />, onClick: () => {} },
    { id: "3", title: "Alice Johnson", description: "Online • Software Engineer", category: "Members", icon: <User className="w-4 h-4" />, onClick: () => {} },
    { id: "4", title: "Bob Smith", description: "Idle • Designer", category: "Members", icon: <User className="w-4 h-4" />, onClick: () => {} },
  ];

  const handleSearch = (query: string) => {
    if (query) {
      setSearchResults(demoSearchResults.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setSearchResults([]);
    }
  };

  const simulateTyping = () => {
    setTypingUsers(["Alice", "Bob"]);
    setTimeout(() => setTypingUsers([]), 5000);
  };

  const toggleVoice = () => {
    setIsSpeaking(!isSpeaking);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <RevealOnScroll direction="down">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Phase 3 Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced interactions, animations, and UX enhancements
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <kbd className="px-2 py-1 bg-muted rounded border border-border">⌘K</kbd>
              <span>to open command palette</span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Command Palette */}
        <CommandPalette commands={commands} />

        {/* Section 1: Context Menus */}
        <RevealOnScroll direction="up" delay={100}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Context Menus</h2>
              <p className="text-muted-foreground">Right-click on any message for actions</p>
            </div>
            
            <Card3D intensity={10}>
              <ContextMenu items={messageContextItems}>
                <div className="p-6 border border-border rounded-lg bg-card hover:bg-card/80 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">A</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Alice</span>
                        <span className="text-xs text-muted-foreground">Today at 2:30 PM</span>
                      </div>
                      <p className="text-sm">
                        Right-click this message to see context menu options! 🎉
                      </p>
                      <MessageReactions
                        reactions={reactions}
                        onReact={handleReact}
                        onRemoveReaction={handleRemoveReaction}
                      />
                    </div>
                  </div>
                </div>
              </ContextMenu>
            </Card3D>
          </section>
        </RevealOnScroll>

        {/* Section 2: Message Reactions */}
        <RevealOnScroll direction="up" delay={200}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Message Reactions</h2>
              <p className="text-muted-foreground">Click reactions or add your own</p>
            </div>
            
            <Card3D intensity={10}>
              <div className="p-6 border border-border rounded-lg bg-card">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-500 text-white">B</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">Bob</span>
                      <span className="text-xs text-muted-foreground">Today at 2:35 PM</span>
                    </div>
                    <p className="text-sm">
                      Click the + button to add reactions, or click existing ones to toggle! 👍
                    </p>
                    <MessageReactions
                      reactions={reactions}
                      onReact={handleReact}
                      onRemoveReaction={handleRemoveReaction}
                    />
                  </div>
                </div>
              </div>
            </Card3D>
          </section>
        </RevealOnScroll>

        {/* Section 3: Typing Indicator */}
        <RevealOnScroll direction="up" delay={300}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Typing Indicators</h2>
              <p className="text-muted-foreground">Live feedback when users are typing</p>
            </div>
            
            <Card3D intensity={10}>
              <div className="border border-border rounded-lg bg-card overflow-hidden">
                <div className="p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-green-500 text-white">C</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Charlie</span>
                        <span className="text-xs text-muted-foreground">Today at 2:40 PM</span>
                      </div>
                      <p className="text-sm">
                        Check out the typing indicator below! 👇
                      </p>
                    </div>
                  </div>
                </div>
                <TypingIndicator users={typingUsers} />
                <div className="p-4 border-t border-border">
                  <Button onClick={simulateTyping} variant="outline" size="sm">
                    Simulate Typing
                  </Button>
                </div>
              </div>
            </Card3D>
          </section>
        </RevealOnScroll>

        {/* Section 4: Voice Activity */}
        <RevealOnScroll direction="up" delay={400}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Voice Activity Indicators</h2>
              <p className="text-muted-foreground">Animated bars show when users are speaking</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card3D intensity={10}>
                <div className="p-6 border border-border rounded-lg bg-card space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Bar Style</h3>
                    <VoiceActivity 
                      isSpeaking={isSpeaking} 
                      username="Alice" 
                      size="lg" 
                    />
                  </div>
                  <div>
                    <VoiceActivity 
                      isSpeaking={!isSpeaking} 
                      username="Bob" 
                      size="md" 
                    />
                  </div>
                  <Button onClick={toggleVoice} variant="outline" size="sm">
                    Toggle Speaking
                  </Button>
                </div>
              </Card3D>

              <Card3D intensity={10}>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <h3 className="font-semibold mb-4">Ring Style</h3>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="bg-purple-500 text-white text-xl">D</AvatarFallback>
                      </Avatar>
                      <VoiceActivityRing isSpeaking={isSpeaking} size={64} />
                    </div>
                    <div>
                      <div className="font-semibold">Diana</div>
                      <div className="text-sm text-muted-foreground">
                        {isSpeaking ? "Speaking..." : "Silent"}
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </section>
        </RevealOnScroll>

        {/* Section 5: Enhanced Search */}
        <RevealOnScroll direction="up" delay={500}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Enhanced Search</h2>
              <p className="text-muted-foreground">Fuzzy search with filters and keyboard navigation</p>
            </div>
            
            <Card3D intensity={10}>
              <div className="p-6 border border-border rounded-lg bg-card">
                <EnhancedSearch
                  placeholder="Search channels, members, messages..."
                  onSearch={handleSearch}
                  results={searchResults}
                  filters={[
                    { id: "channels", label: "Channels Only", type: "toggle" },
                    { 
                      id: "category", 
                      label: "Category", 
                      type: "select",
                      options: [
                        { value: "all", label: "All" },
                        { value: "channels", label: "Channels" },
                        { value: "members", label: "Members" },
                      ]
                    },
                  ]}
                />
              </div>
            </Card3D>
          </section>
        </RevealOnScroll>

        {/* Section 6: 3D Card Effects */}
        <RevealOnScroll direction="up" delay={600}>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">3D Card Effects</h2>
              <p className="text-muted-foreground">Hover over cards to see perspective transforms</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <FileText className="w-8 h-8" />, title: "Documents", count: "24", color: "bg-blue-500" },
                { icon: <ImageIcon className="w-8 h-8" />, title: "Images", count: "156", color: "bg-green-500" },
                { icon: <Video className="w-8 h-8" />, title: "Videos", count: "12", color: "bg-purple-500" },
              ].map((item, idx) => (
                <Card3D key={idx} intensity={15}>
                  <div className="p-6 border border-border rounded-lg bg-card hover:bg-card/80 transition-colors">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-3xl font-bold">{item.count}</p>
                  </div>
                </Card3D>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Footer */}
        <RevealOnScroll direction="up" delay={700}>
          <div className="text-center py-8 text-muted-foreground">
            <p>Phase 3 Complete! 🎉</p>
            <p className="text-sm mt-2">
              All features are production-ready with 60fps animations
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
