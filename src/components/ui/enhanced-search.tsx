"use client";

import * as React from "react";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedSearchProps {
  placeholder?: string;
  onSearch?: (query: string, filters?: SearchFilters) => void;
  onClear?: () => void;
  results?: SearchResult[];
  filters?: SearchFilterOption[];
  className?: string;
}

interface SearchFilters {
  [key: string]: string | boolean;
}

interface SearchFilterOption {
  id: string;
  label: string;
  type: "toggle" | "select";
  options?: { value: string; label: string }[];
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function EnhancedSearch({
  placeholder = "Search...",
  onSearch,
  onClear,
  results = [],
  filters = [],
  className,
}: EnhancedSearchProps) {
  const [query, setQuery] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState<SearchFilters>({});
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Debounced search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (query || Object.keys(activeFilters).length > 0) {
        onSearch?.(query, activeFilters);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, activeFilters, onSearch]);

  // Click outside to close
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        results[selectedIndex].onClick?.();
        handleClear();
      } else if (e.key === "Escape") {
        handleClear();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, results, selectedIndex]);

  const handleClear = () => {
    setQuery("");
    setActiveFilters({});
    setIsFocused(false);
    onClear?.();
  };

  const handleFilterChange = (filterId: string, value: string | boolean) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, idx) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={idx} className="bg-primary/20 text-primary font-semibold">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const groupedResults = React.useMemo(() => {
    const groups: Record<string, SearchResult[]> = {};
    results.forEach((result) => {
      const category = result.category || "Results";
      if (!groups[category]) groups[category] = [];
      groups[category].push(result);
    });
    return groups;
  }, [results]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Search Input */}
      <div
        className={cn(
          "relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200",
          isFocused
            ? "border-primary shadow-lg animate-search-pulse"
            : "border-border hover:border-primary/50"
        )}
      >
        <Search className="w-4 h-4 text-muted-foreground transition-colors duration-200" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
        />
        
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "p-1 rounded-md transition-all duration-200 hover:bg-accent",
              showFilters && "bg-accent"
            )}
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
        
        {query && (
          <button
            onClick={handleClear}
            className="p-1 rounded-md transition-all duration-200 hover:bg-accent active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && filters.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-popover border border-border rounded-lg shadow-xl z-50 animate-slide-down">
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Filters
            </div>
            {filters.map((filter) => (
              <div key={filter.id} className="flex items-center justify-between">
                <label className="text-sm font-medium">{filter.label}</label>
                {filter.type === "toggle" ? (
                  <button
                    onClick={() =>
                      handleFilterChange(filter.id, !activeFilters[filter.id])
                    }
                    className={cn(
                      "w-10 h-5 rounded-full transition-all duration-200 relative",
                      activeFilters[filter.id]
                        ? "bg-primary"
                        : "bg-muted"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200",
                        activeFilters[filter.id]
                          ? "left-5"
                          : "left-0.5"
                      )}
                    />
                  </button>
                ) : (
                  <select
                    value={(activeFilters[filter.id] as string) || ""}
                    onChange={(e) =>
                      handleFilterChange(filter.id, e.target.value)
                    }
                    className="px-2 py-1 text-sm rounded-md border border-border bg-background"
                  >
                    <option value="">All</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Dropdown */}
      {isFocused && (query || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto bg-popover border border-border rounded-lg shadow-2xl z-50 animate-scale-in origin-top">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results found
            </div>
          ) : (
            <div className="p-2">
              {Object.entries(groupedResults).map(([category, categoryResults]) => (
                <div key={category} className="mb-3 last:mb-0">
                  <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {category}
                  </div>
                  <div className="space-y-0.5">
                    {categoryResults.map((result, idx) => {
                      const globalIndex = results.indexOf(result);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={result.id}
                          onClick={() => {
                            result.onClick?.();
                            handleClear();
                          }}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-150",
                            isSelected
                              ? "bg-accent scale-[1.01]"
                              : "hover:bg-accent/50"
                          )}
                        >
                          {result.icon && (
                            <div className="w-5 h-5 flex items-center justify-center text-muted-foreground">
                              {result.icon}
                            </div>
                          )}
                          <div className="flex-1 text-left">
                            <div className="font-medium">
                              {highlightMatch(result.title, query)}
                            </div>
                            {result.description && (
                              <div className="text-xs text-muted-foreground">
                                {highlightMatch(result.description, query)}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground flex items-center justify-between">
            <span className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↑↓</kbd>
              Navigate
              <kbd className="px-1.5 py-0.5 bg-background rounded border border-border">↵</kbd>
              Select
            </span>
            <span>{results.length} results</span>
          </div>
        </div>
      )}
    </div>
  );
}
