'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Calendar,
  Activity,
  Eye,
  Heart,
  Hash,
  Video,
  Download,
  Share2,
  Filter
} from 'lucide-react';

export default function AnalyticsPage() {
  const stats = [
    {
      label: 'Total Messages',
      value: '45,231',
      change: '+12.5%',
      trend: 'up',
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      label: 'Active Users',
      value: '1,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-green-500'
    },
    {
      label: 'Voice Minutes',
      value: '24,892',
      change: '-3.1%',
      trend: 'down',
      icon: Video,
      color: 'text-purple-500'
    },
    {
      label: 'Avg Response Time',
      value: '4.2m',
      change: '-15.3%',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  const channelStats = [
    { channel: 'general', messages: 12453, users: 245, engagement: 92 },
    { channel: 'dev-help', messages: 8932, users: 167, engagement: 88 },
    { channel: 'design', messages: 6721, users: 134, engagement: 85 },
    { channel: 'backend', messages: 5234, users: 98, engagement: 81 },
    { channel: 'frontend', messages: 4567, users: 87, engagement: 78 },
    { channel: 'random', messages: 3921, users: 234, engagement: 65 },
  ];

  const topContributors = [
    { name: 'sarah_dev', avatar: '👩‍💻', messages: 1245, reactions: 567, rank: 1 },
    { name: 'mike_pm', avatar: '👨‍💼', messages: 987, reactions: 445, rank: 2 },
    { name: 'alex_qa', avatar: '🧪', messages: 876, reactions: 398, rank: 3 },
    { name: 'emma_ux', avatar: '🎨', messages: 654, reactions: 321, rank: 4 },
    { name: 'chris_db', avatar: '🗄️', messages: 543, reactions: 287, rank: 5 },
  ];

  const activityByHour = [
    { hour: '00:00', messages: 45 },
    { hour: '03:00', messages: 12 },
    { hour: '06:00', messages: 89 },
    { hour: '09:00', messages: 456 },
    { hour: '12:00', messages: 678 },
    { hour: '15:00', messages: 543 },
    { hour: '18:00', messages: 389 },
    { hour: '21:00', messages: 234 },
  ];

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Header */}
      <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Server Analytics</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button variant="ghost" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Main Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      {stat.trend === 'up' ? (
                        <>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-green-500">{stat.change}</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 text-red-500" />
                          <span className="text-red-500">{stat.change}</span>
                        </>
                      )}
                      <span className="text-muted-foreground ml-1">vs last period</span>
                    </div>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Activity Chart */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Message Activity</h2>
                <p className="text-sm text-muted-foreground">Messages sent by hour</p>
              </div>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between gap-2 h-48">
              {activityByHour.map((data, index) => {
                const maxMessages = Math.max(...activityByHour.map(d => d.messages));
                const heightPercent = (data.messages / maxMessages) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-40">
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm transition-all hover:bg-blue-400 cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                        title={`${data.messages} messages`}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.hour}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Channel Stats */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Top Channels</h2>
              <div className="space-y-4">
                {channelStats.map((channel, index) => (
                  <div key={channel.channel}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">#{channel.channel}</span>
                        <span className="text-xs text-muted-foreground">
                          {channel.messages.toLocaleString()} msgs
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{channel.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          <span>{channel.engagement}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${channel.engagement}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>
              <div className="space-y-3">
                {topContributors.map((user) => (
                  <div 
                    key={user.name}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-sm font-bold">
                      {user.rank}
                    </div>
                    
                    <div className="text-2xl">{user.avatar}</div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{user.messages.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{user.reactions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {user.rank <= 3 && (
                      <div className="text-xl">
                        {user.rank === 1 && '🥇'}
                        {user.rank === 2 && '🥈'}
                        {user.rank === 3 && '🥉'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Peak Online Users</p>
              </div>
              <p className="text-2xl font-bold">892</p>
              <p className="text-xs text-muted-foreground mt-1">Today at 3:45 PM</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Active Threads</p>
              </div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-xs text-muted-foreground mt-1">12 resolved today</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Voice Sessions</p>
              </div>
              <p className="text-2xl font-bold">127</p>
              <p className="text-xs text-muted-foreground mt-1">Avg duration: 23m</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
