"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  commands: CommandItem[];
}

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  category?: string;
  onExecute: () => void;
}

export function CommandPalette({ commands }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter commands based on search
  const filteredCommands = React.useMemo(() => {
    if (!search) return commands;
    const searchLower = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(searchLower) ||
        cmd.description?.toLowerCase().includes(searchLower) ||
        cmd.category?.toLowerCase().includes(searchLower)
    );
  }, [commands, search]);

  // Group by category
  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      const category = cmd.category || "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setSearch("");
        setSelectedIndex(0);
      }
      
      // Arrow navigation
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        
        // Enter to execute
        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault();
          executeCommand(filteredCommands[selectedIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  const executeCommand = (command: CommandItem) => {
    command.onExecute();
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  return typeof window !== "undefined"
    ? createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Command Palette */}
          <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4 animate-slide-down">
            <div className="bg-popover border border-border rounded-lg shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Command className="w-5 h-5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex h-5 px-1.5 items-center gap-1 rounded border border-border bg-muted text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              {/* Command List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {Object.keys(groupedCommands).length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No commands found
                  </div>
                ) : (
                  Object.entries(groupedCommands).map(([category, cmds]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category}
                      </div>
                      <div className="space-y-0.5">
                        {cmds.map((cmd, idx) => {
                          const globalIndex = filteredCommands.indexOf(cmd);
                          const isSelected = globalIndex === selectedIndex;
                          
                          return (
                            <button
                              key={cmd.id}
                              onClick={() => executeCommand(cmd)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150",
                                isSelected
                                  ? "bg-accent scale-[1.02]"
                                  : "hover:bg-accent/50"
                              )}
                            >
                              {cmd.icon && (
                                <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                                  {cmd.icon}
                                </div>
                              )}
                              <div className="flex-1 text-left">
                                <div className="font-medium">{cmd.label}</div>
                                {cmd.description && (
                                  <div className="text-xs text-muted-foreground">
                                    {cmd.description}
                                  </div>
                                )}
                              </div>
                              {cmd.shortcut && (
                                <kbd className="hidden sm:inline-flex h-5 px-1.5 items-center gap-1 rounded border border-border bg-muted text-[10px] font-medium text-muted-foreground">
                                  {cmd.shortcut}
                                </kbd>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd>
                    Execute
                  </span>
                </div>
                <span>{filteredCommands.length} commands</span>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}

// Hook to use command palette
export function useCommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
