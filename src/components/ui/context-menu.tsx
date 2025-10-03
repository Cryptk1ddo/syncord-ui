"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface ContextMenuProps {
  children: React.ReactNode;
  items: ContextMenuItem[];
}

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  shortcut?: string;
  variant?: "default" | "danger";
  divider?: boolean;
}

export function ContextMenu({ children, items }: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("wheel", handleScroll);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("wheel", handleScroll);
      };
    }
  }, [isOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Calculate position
    const x = e.clientX;
    const y = e.clientY;
    
    // Get menu dimensions (estimate)
    const menuWidth = 220;
    const menuHeight = items.length * 36 + 16;
    
    // Adjust if too close to edges
    const adjustedX = x + menuWidth > window.innerWidth ? x - menuWidth : x;
    const adjustedY = y + menuHeight > window.innerHeight ? y - menuHeight : y;
    
    setPosition({ x: adjustedX, y: adjustedY });
    setIsOpen(true);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    item.onClick?.();
    setIsOpen(false);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu}>
        {children}
      </div>
      
      {isOpen && typeof window !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[100] min-w-[220px] bg-popover border border-border rounded-md shadow-2xl animate-scale-in origin-top-left"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            <div className="p-2 space-y-0.5">
              {items.map((item, idx) => (
                <React.Fragment key={idx}>
                  {item.divider ? (
                    <div className="h-px bg-border my-2" />
                  ) : (
                    <button
                      onClick={() => handleItemClick(item)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-all duration-150",
                        "hover:bg-accent hover:pl-4 active:scale-98",
                        item.variant === "danger"
                          ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          : "text-foreground hover:text-foreground"
                      )}
                    >
                      {item.icon && (
                        <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && (
                        <span className="text-xs text-muted-foreground font-mono opacity-60">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
