"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  TrendingUp,
  Users,
  Globe,
  Lock,
  Plus,
  ChevronRight,
  Star,
  Hash,
  Volume2,
} from "lucide-react";
import Link from "next/link";

interface ServerDiscovery {
  id: string;
  name: string;
  description: string;
  members: number;
  online: number;
  category: string;
  verified: boolean;
  icon: string;
}

const mockServers: ServerDiscovery[] = [
  {
    id: "1",
    name: "Tech Innovators",
    description: "A community for tech enthusiasts and developers",
    members: 125000,
    online: 45000,
    category: "Technology",
    verified: true,
    icon: "TI",
  },
  {
    id: "2",
    name: "Creative Hub",
    description: "Artists, designers, and creative minds unite",
    members: 89000,
    online: 23000,
    category: "Art & Design",
    verified: true,
    icon: "CH",
  },
  {
    id: "3",
    name: "Gaming Legends",
    description: "Where gamers gather to play and compete",
    members: 250000,
    online: 78000,
    category: "Gaming",
    verified: true,
    icon: "GL",
  },
  {
    id: "4",
    name: "Music Producers",
    description: "Share beats, collaborate, and learn production",
    members: 45000,
    online: 12000,
    category: "Music",
    verified: false,
    icon: "MP",
  },
];

export default function DiscoverPage() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-[60px] border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Discover Servers</h1>
          </div>
          <div className="flex items-center gap-2 w-96">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search servers..."
                className="pl-10 bg-muted border-none"
              />
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["All", "Gaming", "Technology", "Music", "Education", "Art & Design", "Sports"].map(
                (category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                )
              )}
            </div>

            {/* Featured Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Featured Servers</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockServers.slice(0, 2).map((server) => (
                  <div
                    key={server.id}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold">
                        {server.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{server.name}</h3>
                          {server.verified && (
                            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                              <svg
                                className="h-3 w-3 text-primary-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {server.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {server.members.toLocaleString()} members
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            {server.online.toLocaleString()} online
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Join Server</Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Trending Servers */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Trending Now</h2>
              </div>

              <div className="space-y-3">
                {mockServers.map((server) => (
                  <div
                    key={server.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center font-bold">
                        {server.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{server.name}</h3>
                          {server.verified && (
                            <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-primary-foreground"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                          )}
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {server.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {server.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {server.members.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            {server.online.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Create Your Own */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Create Your Own Server</h3>
                  <p className="text-sm text-muted-foreground">
                    Start your community and invite your friends
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Server
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
