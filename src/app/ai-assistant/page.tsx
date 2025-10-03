"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Bot,
  Send,
  Sparkles,
  Code,
  Lightbulb,
  FileText,
  ChevronLeft,
  Mic,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface AIMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  suggestions?: string[];
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      content:
        "👋 Hi! I'm your AI assistant. I can help you with coding questions, server management, content moderation, and more. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Help me setup a new channel",
        "Explain golden ratio design",
        "Write a TypeScript function",
        "Moderate toxic messages",
      ],
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    const aiResponse: AIMessage = {
      id: (Date.now() + 1).toString(),
      content:
        "I understand you're asking about: " +
        input +
        ". This is a demo response. In a real implementation, this would connect to an AI API like OpenAI GPT-4 or Anthropic Claude for intelligent responses.",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "Tell me more",
        "Show me an example",
        "Different approach",
      ],
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInput("");
  };

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
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">
                  Powered by advanced AI
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Suggest Ideas
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <div
                  className={`flex gap-4 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback
                      className={
                        message.sender === "ai"
                          ? "bg-gradient-to-br from-primary to-accent"
                          : "bg-muted"
                      }
                    >
                      {message.sender === "ai" ? (
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      ) : (
                        "U"
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex-1 ${
                      message.sender === "user" ? "items-end" : "items-start"
                    } flex flex-col`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-2xl ${
                        message.sender === "ai"
                          ? "bg-card border border-border"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => setInput(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Code Help
              </Button>
              <Button variant="outline" size="sm">
                <Lightbulb className="h-4 w-4 mr-2" />
                Ideas
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Summarize
              </Button>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
