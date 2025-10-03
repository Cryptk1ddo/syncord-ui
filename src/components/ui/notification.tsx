'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
  error: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
  info: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400',
};

export function Notification({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose 
}: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false);
  const Icon = icons[type];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm",
        "transition-all duration-300",
        styles[type],
        isExiting 
          ? "animate-slide-in-right opacity-0 scale-95" 
          : "animate-notification-pop"
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5 animate-subtle-bounce" />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm mb-0.5">{title}</h4>
        {message && (
          <p className="text-sm opacity-90">{message}</p>
        )}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 flex-shrink-0 hover:scale-110 active:scale-95 transition-all duration-200 group"
        onClick={handleClose}
      >
        <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
      </Button>

      {/* Progress bar for auto-dismiss */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-20 rounded-b-lg overflow-hidden">
          <div 
            className="h-full bg-current animate-[slide-in-left_linear]"
            style={{ animation: `slide-in-left ${duration}ms linear` }}
          />
        </div>
      )}
    </div>
  );
}

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
  }>;
  onClose: (id: string) => void;
}

export function NotificationContainer({ notifications, onClose }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none max-w-md">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Notification {...notification} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
  }>>([]);

  const addNotification = (
    type: NotificationType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, type, title, message, duration }]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    success: (title: string, message?: string, duration?: number) => 
      addNotification('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) => 
      addNotification('error', title, message, duration),
    info: (title: string, message?: string, duration?: number) => 
      addNotification('info', title, message, duration),
    warning: (title: string, message?: string, duration?: number) => 
      addNotification('warning', title, message, duration),
  };
}
