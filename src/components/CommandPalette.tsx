// Command Palette (Cmd+K style)
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Hash,
  User,
  Settings,
  MessageSquare,
  Video,
  BarChart3,
  Bot,
  Compass,
  Activity,
  Moon,
  Sun,
  LogOut,
  Bell,
  Keyboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
  category: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const commands: Command[] = [
    // Navigation
    {
      id: 'nav-home',
      label: 'Go to Home',
      description: 'Main chat interface',
      icon: MessageSquare,
      action: () => router.push('/'),
      keywords: ['home', 'chat', 'main'],
      category: 'Navigation'
    },
    {
      id: 'nav-discover',
      label: 'Discover Servers',
      description: 'Browse and join servers',
      icon: Compass,
      action: () => router.push('/discover'),
      keywords: ['discover', 'browse', 'servers'],
      category: 'Navigation'
    },
    {
      id: 'nav-ai',
      label: 'AI Assistant',
      description: 'Chat with AI',
      icon: Bot,
      action: () => router.push('/ai-assistant'),
      keywords: ['ai', 'assistant', 'help', 'bot'],
      category: 'Navigation'
    },
    {
      id: 'nav-threads',
      label: 'View Threads',
      description: 'Manage discussions',
      icon: MessageSquare,
      action: () => router.push('/threads'),
      keywords: ['threads', 'discussions'],
      category: 'Navigation'
    },
    {
      id: 'nav-activities',
      label: 'Activity Feed',
      description: 'See all notifications',
      icon: Activity,
      action: () => router.push('/activities'),
      keywords: ['activity', 'notifications', 'feed'],
      category: 'Navigation'
    },
    {
      id: 'nav-analytics',
      label: 'Server Analytics',
      description: 'View server insights',
      icon: BarChart3,
      action: () => router.push('/analytics'),
      keywords: ['analytics', 'stats', 'insights'],
      category: 'Navigation'
    },
    {
      id: 'nav-profile',
      label: 'My Profile',
      description: 'View and edit profile',
      icon: User,
      action: () => router.push('/profile'),
      keywords: ['profile', 'me', 'account'],
      category: 'Navigation'
    },
    {
      id: 'nav-voice',
      label: 'Join Voice Room',
      description: 'Start a voice call',
      icon: Video,
      action: () => router.push('/voice-room'),
      keywords: ['voice', 'video', 'call'],
      category: 'Navigation'
    },
    // Actions
    {
      id: 'action-notifications',
      label: 'Toggle Notifications',
      description: 'Enable/disable notifications',
      icon: Bell,
      action: () => console.log('Toggle notifications'),
      keywords: ['notifications', 'alerts'],
      category: 'Actions'
    },
    {
      id: 'action-theme',
      label: 'Toggle Theme',
      description: 'Switch between light/dark',
      icon: Moon,
      action: () => console.log('Toggle theme'),
      keywords: ['theme', 'dark', 'light', 'mode'],
      category: 'Actions'
    },
    {
      id: 'action-shortcuts',
      label: 'Show Keyboard Shortcuts',
      description: 'View all shortcuts',
      icon: Keyboard,
      action: () => console.log('Show shortcuts'),
      keywords: ['shortcuts', 'keyboard', 'keys'],
      category: 'Actions'
    },
    {
      id: 'action-settings',
      label: 'Open Settings',
      description: 'Configure app settings',
      icon: Settings,
      action: () => console.log('Open settings'),
      keywords: ['settings', 'preferences', 'config'],
      category: 'Actions'
    },
    {
      id: 'action-logout',
      label: 'Log Out',
      description: 'Sign out of your account',
      icon: LogOut,
      action: () => console.log('Logout'),
      keywords: ['logout', 'signout', 'exit'],
      category: 'Actions'
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
    cmd.keywords?.some(k => k.includes(query.toLowerCase()))
  );

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  // Keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          cmd.action();
          setOpen(false);
          setQuery("");
          setSelectedIndex(0);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, selectedIndex, filteredCommands]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
          />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">ESC</span>
          </kbd>
        </div>

        {/* Commands List */}
        <ScrollArea className="max-h-[400px]">
          <div className="p-2">
            {Object.keys(groupedCommands).length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              Object.entries(groupedCommands).map(([category, cmds]) => (
                <div key={category} className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">
                    {category}
                  </div>
                  {cmds.map((cmd, index) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleSelect(cmd)}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                          selectedIndex === globalIndex
                            ? "bg-accent"
                            : "hover:bg-accent/50"
                        )}
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-muted">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{cmd.label}</div>
                          {cmd.description && (
                            <div className="text-xs text-muted-foreground">
                              {cmd.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <kbd className="h-5 px-1.5 rounded border border-border bg-muted font-mono">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="h-5 px-1.5 rounded border border-border bg-muted font-mono">↵</kbd>
              <span>Select</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="h-5 px-1.5 rounded border border-border bg-muted font-mono text-[10px]">
              {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}K
            </kbd>
            <span>to toggle</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
