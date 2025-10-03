"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Bell,
  Palette,
  Key,
  Globe,
  ChevronLeft,
  Edit,
  Camera,
  Save,
  X,
  Zap,
  Award,
  BarChart3,
  Clock,
  MessageSquare,
  Heart,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface ProfileStats {
  messages: number;
  reactions: number;
  voiceTime: number;
  joinDate: string;
  badges: string[];
}

const mockStats: ProfileStats = {
  messages: 15420,
  reactions: 3241,
  voiceTime: 156,
  joinDate: "January 2024",
  badges: ["Early Adopter", "Active User", "Helper"],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("Username");
  const [bio, setBio] = useState("Building the future of communication 🚀");
  const [status, setStatus] = useState("Available");

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-[60px] border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">My Profile</h1>
          </div>
          <Button
            variant={isEditing ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Profile Banner */}
            <div className="relative h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg overflow-hidden">
              {isEditing && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-4 right-4"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Banner
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="relative -mt-16 px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      U
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="text-2xl font-bold h-12"
                      />
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Your bio..."
                        className="text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold">{displayName}</h2>
                      <p className="text-muted-foreground">@username#0001</p>
                      <p className="text-sm mt-2">{bio}</p>
                    </>
                  )}

                  <div className="flex gap-2 mt-3">
                    {mockStats.badges.map((badge) => (
                      <div
                        key={badge}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex items-center gap-1"
                      >
                        <Award className="h-3 w-3" />
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.messages.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Messages Sent</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.reactions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Reactions Given</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{mockStats.voiceTime}h</p>
                    <p className="text-xs text-muted-foreground">Voice Time</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Jan '24</p>
                    <p className="text-xs text-muted-foreground">Member Since</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Account Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Settings
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">••••••••</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Enabled</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Manage</Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferences
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-muted-foreground">Manage notification settings</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Language & Region</p>
                      <p className="text-sm text-muted-foreground">English (US)</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Activity Analytics</p>
                      <p className="text-sm text-muted-foreground">View detailed usage stats</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </div>

            {/* Premium Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Syncord Premium
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Unlock exclusive features, custom themes, and more
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Custom profile themes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Animated avatars
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Enhanced file uploads
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Priority support
                    </li>
                  </ul>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
