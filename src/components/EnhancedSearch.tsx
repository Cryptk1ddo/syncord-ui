// Enhanced Search Component with Live Results
"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Hash, User, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SearchResult {
  id: string;
  type: 'message' | 'user' | 'channel';
  title: string;
  description?: string;
  timestamp?: string;
  avatar?: string;
}

export function EnhancedSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'message',
      title: 'Can you help review this PR?',
      description: 'sarah_dev in #dev-help',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'user',
      title: 'mike_pm',
      description: 'Project Manager',
      avatar: '👨‍💼'
    },
    {
      id: '3',
      type: 'channel',
      title: 'general',
      description: '1,234 messages'
    },
    {
      id: '4',
      type: 'message',
      title: 'Bug: Dark mode not persisting',
      description: 'alex_qa in #bug-reports',
      timestamp: '1 day ago'
    },
    {
      id: '5',
      type: 'user',
      title: 'emma_ux',
      description: 'UX Designer',
      avatar: '🎨'
    }
  ];

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate API call
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(r => 
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'message':
        return FileText;
      case 'user':
        return User;
      case 'channel':
        return Hash;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search messages, users, channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Results Panel */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : results.length > 0 ? (
              <ScrollArea className="max-h-[400px]">
                <div className="p-2">
                  {results.map((result, index) => {
                    const Icon = getIcon(result.type);
                    return (
                      <div key={result.id}>
                        <button
                          className={cn(
                            "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                            "hover:bg-accent transition-colors"
                          )}
                          onClick={() => {
                            console.log('Selected:', result);
                            setIsOpen(false);
                          }}
                        >
                          {result.type === 'user' && result.avatar ? (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="text-sm">
                                {result.avatar}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted flex-shrink-0">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">
                                {result.title}
                              </span>
                              {result.type === 'channel' && (
                                <Hash className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              )}
                            </div>
                            {result.description && (
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {result.description}
                              </p>
                            )}
                          </div>
                          
                          {result.timestamp && (
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {result.timestamp}
                            </span>
                          )}
                        </button>
                        {index < results.length - 1 && <Separator className="my-1" />}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
