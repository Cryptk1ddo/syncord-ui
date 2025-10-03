"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Video,
  Monitor,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Settings,
  Users,
  Grid3x3,
  Maximize2,
  MessageSquare,
  ChevronLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  isScreenSharing: boolean;
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "You",
    avatar: "U",
    isSpeaking: true,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: true,
  },
  {
    id: "2",
    name: "Alice",
    avatar: "A",
    isSpeaking: false,
    isMuted: false,
    isVideoOff: false,
    isScreenSharing: false,
  },
  {
    id: "3",
    name: "Bob",
    avatar: "B",
    isSpeaking: false,
    isMuted: true,
    isVideoOff: false,
    isScreenSharing: false,
  },
  {
    id: "4",
    name: "Charlie",
    avatar: "C",
    isSpeaking: false,
    isMuted: false,
    isVideoOff: true,
    isScreenSharing: false,
  },
];

export default function VoiceRoomPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "speaker">("grid");

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-[60px] border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold">General Voice</h1>
              <p className="text-xs text-muted-foreground">
                {mockParticipants.length} participants
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "speaker" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("speaker")}
            >
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-6">
          <div
            className={`h-full grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {mockParticipants.map((participant) => (
              <div
                key={participant.id}
                className={`relative bg-card border-2 rounded-lg overflow-hidden ${
                  participant.isSpeaking
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {participant.isScreenSharing ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center space-y-2">
                      <Monitor className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-sm font-medium">
                        {participant.name} is sharing their screen
                      </p>
                      <div className="aspect-video bg-background rounded-lg max-w-2xl mx-auto border border-border flex items-center justify-center">
                        <p className="text-muted-foreground">Screen Content Preview</p>
                      </div>
                    </div>
                  </div>
                ) : participant.isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {participant.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <div className="text-center">
                      <Video className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Video Stream
                      </p>
                    </div>
                  </div>
                )}

                {/* Participant Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">
                        {participant.name}
                      </span>
                      {participant.isSpeaking && (
                        <div className="flex gap-0.5">
                          <div className="h-3 w-0.5 bg-primary rounded-full animate-pulse" />
                          <div className="h-3 w-0.5 bg-primary rounded-full animate-pulse delay-75" />
                          <div className="h-3 w-0.5 bg-primary rounded-full animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {participant.isMuted && (
                        <div className="h-6 w-6 rounded-full bg-red-500/90 flex items-center justify-center">
                          <MicOff className="h-3 w-3 text-white" />
                        </div>
                      )}
                      {participant.isVideoOff && (
                        <div className="h-6 w-6 rounded-full bg-muted/90 flex items-center justify-center">
                          <VideoOff className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Control Bar */}
        <div className="h-20 border-t border-border flex items-center justify-center gap-3 px-6">
          <Button
            size="icon"
            variant={isMuted ? "destructive" : "secondary"}
            className="h-12 w-12 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <MicOff className="h-5 w-5" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant={isVideoOff ? "destructive" : "secondary"}
            className="h-12 w-12 rounded-full"
            onClick={() => setIsVideoOff(!isVideoOff)}
          >
            {isVideoOff ? (
              <VideoOff className="h-5 w-5" />
            ) : (
              <Video className="h-5 w-5" />
            )}
          </Button>

          <Button
            size="icon"
            variant={isScreenSharing ? "default" : "secondary"}
            className="h-12 w-12 rounded-full"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
          >
            <Share2 className="h-5 w-5" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="h-12 w-12 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Button
            size="icon"
            variant="destructive"
            className="h-12 w-12 rounded-full"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
