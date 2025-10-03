'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Activity,
  MessageSquare,
  UserPlus,
  Hash,
  Video,
  Edit,
  Trash,
  AtSign,
  Heart,
  Pin,
  Star,
  Clock,
  Calendar,
  Filter,
  Search,
  Bell,
  CheckCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ActivitiesPage() {
  const activities = [
    {
      id: 1,
      type: 'mention',
      icon: AtSign,
      color: 'text-blue-500',
      user: 'sarah_dev',
      avatar: '👩‍💻',
      action: 'mentioned you in',
      target: '#dev-help',
      content: '@you Can you help review this PR?',
      timestamp: '2 minutes ago',
      isUnread: true
    },
    {
      id: 2,
      type: 'reaction',
      icon: Heart,
      color: 'text-red-500',
      user: 'mike_pm',
      avatar: '👨‍💼',
      action: 'reacted to your message in',
      target: '#general',
      content: '❤️ Great work on the new feature!',
      timestamp: '5 minutes ago',
      isUnread: true
    },
    {
      id: 3,
      type: 'reply',
      icon: MessageSquare,
      color: 'text-green-500',
      user: 'alex_qa',
      avatar: '🧪',
      action: 'replied to your thread',
      target: 'Bug: Dark mode issue',
      content: 'I found the root cause. It\'s in the localStorage...',
      timestamp: '15 minutes ago',
      isUnread: true
    },
    {
      id: 4,
      type: 'join',
      icon: UserPlus,
      color: 'text-purple-500',
      user: 'emma_ux',
      avatar: '🎨',
      action: 'joined',
      target: 'Design Team',
      content: null,
      timestamp: '1 hour ago',
      isUnread: false
    },
    {
      id: 5,
      type: 'voice',
      icon: Video,
      color: 'text-orange-500',
      user: 'chris_db',
      avatar: '🗄️',
      action: 'started a voice chat in',
      target: '#backend',
      content: 'Daily standup - Join us!',
      timestamp: '2 hours ago',
      isUnread: false
    },
    {
      id: 6,
      type: 'pin',
      icon: Pin,
      color: 'text-yellow-500',
      user: 'admin',
      avatar: '🛡️',
      action: 'pinned a message in',
      target: '#announcements',
      content: 'Server maintenance scheduled for this weekend',
      timestamp: '3 hours ago',
      isUnread: false
    },
    {
      id: 7,
      type: 'star',
      icon: Star,
      color: 'text-yellow-500',
      user: 'tom_ops',
      avatar: '⚙️',
      action: 'starred your thread',
      target: 'CI/CD Optimization',
      content: null,
      timestamp: '4 hours ago',
      isUnread: false
    },
    {
      id: 8,
      type: 'edit',
      icon: Edit,
      color: 'text-blue-400',
      user: 'lisa_api',
      avatar: '🔧',
      action: 'edited a message in',
      target: '#backend',
      content: 'Updated the API endpoint documentation',
      timestamp: '5 hours ago',
      isUnread: false
    },
    {
      id: 9,
      type: 'mention',
      icon: AtSign,
      color: 'text-blue-500',
      user: 'john_dev',
      avatar: '👨‍💻',
      action: 'mentioned you in',
      target: '#code-review',
      content: '@you Your feedback would be valuable here',
      timestamp: '6 hours ago',
      isUnread: false
    },
    {
      id: 10,
      type: 'reaction',
      icon: Heart,
      color: 'text-red-500',
      user: 'kate_design',
      avatar: '🎨',
      action: 'reacted to your message in',
      target: '#design',
      content: '🚀 Love this mockup!',
      timestamp: 'Yesterday',
      isUnread: false
    }
  ];

  const stats = [
    { label: 'Unread', value: '3', icon: Bell, color: 'text-red-500' },
    { label: 'Mentions', value: '12', icon: AtSign, color: 'text-blue-500' },
    { label: 'Reactions', value: '45', icon: Heart, color: 'text-red-500' },
    { label: 'Threads', value: '8', icon: MessageSquare, color: 'text-green-500' }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Activity Feed</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 border-b border-border p-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Activity Filters */}
        <div className="w-[240px] border-r border-border">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Activity Types
              </div>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Bell className="h-4 w-4" />
                All Activity
                <span className="ml-auto text-xs text-muted-foreground">142</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <AtSign className="h-4 w-4 text-blue-500" />
                Mentions
                <span className="ml-auto text-xs text-muted-foreground">12</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Heart className="h-4 w-4 text-red-500" />
                Reactions
                <span className="ml-auto text-xs text-muted-foreground">45</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-green-500" />
                Replies
                <span className="ml-auto text-xs text-muted-foreground">23</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Video className="h-4 w-4 text-orange-500" />
                Voice Activity
                <span className="ml-auto text-xs text-muted-foreground">8</span>
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <UserPlus className="h-4 w-4 text-purple-500" />
                Join/Leave
                <span className="ml-auto text-xs text-muted-foreground">34</span>
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Pin className="h-4 w-4 text-yellow-500" />
                Pins & Stars
                <span className="ml-auto text-xs text-muted-foreground">15</span>
              </Button>

              <Separator className="my-4" />

              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Time Filter
              </div>

              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Last Hour
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                Today
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                This Week
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                This Month
              </Button>
            </div>
          </ScrollArea>
        </div>

        {/* Main Content - Activity Feed */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search activities..." 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Activity List */}
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={activity.id}>
                    <div 
                      className={`group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-accent/5 cursor-pointer ${
                        activity.isUnread ? 'bg-accent/10' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 ${activity.color}`}>
                        <activity.icon className="h-5 w-5" />
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <span className="text-lg">{activity.avatar}</span>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="text-sm">
                              <span className="font-semibold">{activity.user}</span>
                              <span className="text-muted-foreground"> {activity.action} </span>
                              <span className="font-semibold">{activity.target}</span>
                            </div>
                            
                            {activity.content && (
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {activity.content}
                              </p>
                            )}
                            
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{activity.timestamp}</span>
                            </div>
                          </div>

                          {/* Unread Badge */}
                          {activity.isUnread && (
                            <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {index < activities.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-6 flex justify-center">
                <Button variant="outline">
                  Load More Activities
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
