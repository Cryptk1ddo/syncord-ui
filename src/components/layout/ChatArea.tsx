"use client";

import { Hash, Bell, Pin, Users, Search, Smile, Plus, Gift, Menu, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Message } from "@/components/MessageEnhanced";
import { useSidebarStore } from "@/store/sidebar-store";
import { useState } from "react";

interface MessageType {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar: string;
  edited?: boolean;
}

const messages: MessageType[] = [
  {
    id: "1",
    author: "Alice",
    content: "Welcome to Syncord! This is a Discord clone built with Next.js, TypeScript, and Tailwind CSS.",
    timestamp: "Today at 2:30 PM",
    avatar: "A",
  },
  {
    id: "2",
    author: "Bob",
    content: "The design follows golden ratio proportions and Swiss grid principles for optimal visual hierarchy.",
    timestamp: "Today at 2:32 PM",
    avatar: "B",
  },
  {
    id: "3",
    author: "Charlie",
    content: "Using Shadcn/ui components for a consistent, modern interface with a Grok-like monochrome aesthetic.",
    timestamp: "Today at 2:35 PM",
    avatar: "C",
    edited: true,
  },
];

export function ChatArea() {
  const { toggleChannelSidebar, toggleMembersSidebar } = useSidebarStore();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send
      setMessage("");
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-screen">
      {/* Channel Header - Golden ratio: 60px height */}
      <div className="flex h-[60px] items-center justify-between px-4 border-b border-border bg-card backdrop-blur-sm transition-all duration-300 hover:bg-card/80">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden hover:scale-110 active:scale-95 transition-all duration-200"
            onClick={toggleChannelSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Hash className="h-5 w-5 text-muted-foreground animate-bounce-in" />
          <h2 className="font-bold text-base tracking-tight animate-slide-in-left">general</h2>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group">
            <Bell className="h-4 w-4 group-hover:animate-subtle-bounce" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group">
            <Pin className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group"
            onClick={toggleMembersSidebar}
          >
            <Users className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          </Button>
          <div className="w-[200px] ml-2 hidden lg:block">
            <Input
              placeholder="Search"
              className="h-8 text-sm bg-background hover:bg-muted/50 focus:bg-background transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-4">
          {/* Welcome Message */}
          <div className="py-8 animate-slide-up">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center animate-bounce-in hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Hash className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-center mb-2 animate-slide-in-left">Welcome to #general</h3>
            <p className="text-sm text-muted-foreground text-center animate-slide-in-right">
              This is the start of the #general channel.
            </p>
          </div>

          <Separator />

          {/* Messages */}
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
        </div>
      </ScrollArea>

      {/* Message Input - Golden ratio: ~68px height */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        {isTyping && (
          <div className="text-xs text-muted-foreground mb-2 px-1 flex items-center gap-2 animate-slide-in-left">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-typing-dots" />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-typing-dots" style={{animationDelay: '0.2s'}} />
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-typing-dots" style={{animationDelay: '0.4s'}} />
            </div>
            Several people are typing...
          </div>
        )}
        <div className="relative group/input">
          <Input
            placeholder="Message #general"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="h-11 pr-36 bg-muted border-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300 group-hover/input:bg-muted/80"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn">
              <Plus className="h-5 w-5 group-hover/btn:rotate-90 transition-transform duration-300" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn">
              <Gift className="h-5 w-5 group-hover/btn:scale-110 transition-transform duration-300" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent hover:scale-110 active:scale-95 transition-all duration-200 group/btn">
              <Smile className="h-5 w-5 group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300" />
            </Button>
            {message.trim() && (
              <Button 
                size="icon" 
                className="h-8 w-8 ml-1 animate-bounce-in hover:scale-110 active:scale-95 transition-all duration-200 group/send shadow-lg hover:shadow-xl"
                onClick={handleSend}
              >
                <Send className="h-4 w-4 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 transition-transform duration-200" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
