'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Hash, 
  MessageSquare, 
  Clock, 
  Users, 
  Pin, 
  Star,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Archive
} from 'lucide-react';
import Link from 'next/link';

export default function ThreadsPage() {
  const threads = [
    {
      id: 1,
      title: 'How to implement WebSocket authentication?',
      channel: 'dev-help',
      author: 'sarah_dev',
      authorAvatar: '👩‍💻',
      messageCount: 23,
      participantCount: 7,
      lastActivity: '5 minutes ago',
      isPinned: true,
      isStarred: true,
      isResolved: false,
      tags: ['typescript', 'websocket', 'auth'],
      preview: 'Has anyone worked with WebSocket auth tokens? I need to...'
    },
    {
      id: 2,
      title: 'Project Roadmap Discussion - Q4 2025',
      channel: 'planning',
      author: 'mike_pm',
      authorAvatar: '👨‍💼',
      messageCount: 45,
      participantCount: 12,
      lastActivity: '1 hour ago',
      isPinned: true,
      isStarred: false,
      isResolved: false,
      tags: ['roadmap', 'planning', 'important'],
      preview: 'Let\'s discuss priorities for next quarter. I propose we...'
    },
    {
      id: 3,
      title: 'Bug: Dark mode not persisting on mobile',
      channel: 'bug-reports',
      author: 'alex_qa',
      authorAvatar: '🧪',
      messageCount: 15,
      participantCount: 4,
      lastActivity: '2 hours ago',
      isPinned: false,
      isStarred: false,
      isResolved: true,
      tags: ['bug', 'mobile', 'ui'],
      preview: 'Found an issue where dark mode preference resets...'
    },
    {
      id: 4,
      title: 'Best practices for database indexing',
      channel: 'backend',
      author: 'chris_db',
      authorAvatar: '🗄️',
      messageCount: 31,
      participantCount: 9,
      lastActivity: '3 hours ago',
      isPinned: false,
      isStarred: true,
      isResolved: false,
      tags: ['database', 'performance', 'postgresql'],
      preview: 'What are your strategies for optimizing database queries...'
    },
    {
      id: 5,
      title: 'Design System 2.0 Proposal',
      channel: 'design',
      author: 'emma_ux',
      authorAvatar: '🎨',
      messageCount: 67,
      participantCount: 15,
      lastActivity: '5 hours ago',
      isPinned: false,
      isStarred: true,
      isResolved: false,
      tags: ['design', 'ui', 'figma'],
      preview: 'I\'ve been working on an updated design system with...'
    },
    {
      id: 6,
      title: 'Welcome new team members! 🎉',
      channel: 'general',
      author: 'admin',
      authorAvatar: '🛡️',
      messageCount: 89,
      participantCount: 34,
      lastActivity: '6 hours ago',
      isPinned: true,
      isStarred: false,
      isResolved: false,
      tags: ['welcome', 'onboarding'],
      preview: 'Please give a warm welcome to our 5 new engineers...'
    },
    {
      id: 7,
      title: 'CI/CD Pipeline Optimization',
      channel: 'devops',
      author: 'tom_ops',
      authorAvatar: '⚙️',
      messageCount: 28,
      participantCount: 6,
      lastActivity: '1 day ago',
      isPinned: false,
      isStarred: false,
      isResolved: true,
      tags: ['cicd', 'github-actions', 'performance'],
      preview: 'Reduced our build time from 15min to 4min by...'
    },
    {
      id: 8,
      title: 'API Rate Limiting Strategy',
      channel: 'backend',
      author: 'lisa_api',
      authorAvatar: '🔧',
      messageCount: 19,
      participantCount: 5,
      lastActivity: '1 day ago',
      isPinned: false,
      isStarred: false,
      isResolved: false,
      tags: ['api', 'rate-limiting', 'redis'],
      preview: 'We need to implement better rate limiting. Here\'s what...'
    }
  ];

  const stats = [
    { label: 'Active Threads', value: '45', icon: MessageSquare },
    { label: 'Resolved Today', value: '12', icon: CheckCircle },
    { label: 'Total Participants', value: '156', icon: Users },
    { label: 'Avg Response Time', value: '8m', icon: Clock }
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Threads</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            New Thread
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 border-b border-border p-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Thread Categories */}
        <div className="w-[240px] border-r border-border">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Quick Filters
              </div>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Pin className="h-4 w-4" />
                Pinned Threads
                <span className="ml-auto text-xs text-muted-foreground">3</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <Star className="h-4 w-4" />
                Starred
                <span className="ml-auto text-xs text-muted-foreground">4</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <TrendingUp className="h-4 w-4" />
                Trending
                <span className="ml-auto text-xs text-muted-foreground">8</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                Resolved
                <span className="ml-auto text-xs text-muted-foreground">12</span>
              </Button>
              
              <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                Needs Attention
                <span className="ml-auto text-xs text-muted-foreground">5</span>
              </Button>

              <Separator className="my-4" />

              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                Channels
              </div>

              {['dev-help', 'planning', 'bug-reports', 'backend', 'design', 'general', 'devops'].map((channel) => (
                <Button key={channel} variant="ghost" className="w-full justify-start gap-2 text-sm">
                  <Hash className="h-4 w-4" />
                  {channel}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content - Thread List */}
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4">
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    placeholder="Search threads by title, tag, or author..." 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Thread List */}
              <div className="space-y-3">
                {threads.map((thread) => (
                  <Link href={`/threads/${thread.id}`} key={thread.id}>
                    <div className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-accent hover:bg-accent/5 cursor-pointer">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {/* Thread Header */}
                          <div className="flex items-center gap-2 mb-2">
                            {thread.isPinned && (
                              <Pin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                            )}
                            {thread.isStarred && (
                              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                            )}
                            {thread.isResolved && (
                              <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                            )}
                            <h3 className="text-sm font-semibold truncate">
                              {thread.title}
                            </h3>
                          </div>

                          {/* Channel & Author */}
                          <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                            <Hash className="h-3 w-3" />
                            <span>{thread.channel}</span>
                            <span>•</span>
                            <Avatar className="h-4 w-4">
                              <span className="text-xs">{thread.authorAvatar}</span>
                            </Avatar>
                            <span>{thread.author}</span>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>{thread.lastActivity}</span>
                          </div>

                          {/* Preview */}
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {thread.preview}
                          </p>

                          {/* Tags */}
                          <div className="flex items-center gap-2 flex-wrap">
                            {thread.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{thread.messageCount}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>{thread.participantCount}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
