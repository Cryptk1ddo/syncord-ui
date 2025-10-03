'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Search,
  UserPlus,
  MessageSquare,
  MoreVertical,
  Phone,
  Video,
  Pin,
  Clock,
  Check,
  X,
  Mail,
  Hash,
  AtSign
} from 'lucide-react';

export default function FriendsPage() {
  const friends = [
    { 
      id: 1, 
      name: 'Sarah Dev', 
      username: 'sarah_dev', 
      avatar: '👩‍💻', 
      status: 'online', 
      activity: 'Playing Cyberpunk 2077',
      mutual: 3
    },
    { 
      id: 2, 
      name: 'Mike PM', 
      username: 'mike_pm', 
      avatar: '👨‍💼', 
      status: 'idle', 
      activity: 'Away',
      mutual: 5
    },
    { 
      id: 3, 
      name: 'Alex QA', 
      username: 'alex_qa', 
      avatar: '🧪', 
      status: 'dnd', 
      activity: 'Do Not Disturb',
      mutual: 2
    },
    { 
      id: 4, 
      name: 'Emma UX', 
      username: 'emma_ux', 
      avatar: '🎨', 
      status: 'online', 
      activity: 'In Voice Channel',
      mutual: 7
    },
    { 
      id: 5, 
      name: 'Chris DB', 
      username: 'chris_db', 
      avatar: '🗄️', 
      status: 'offline', 
      activity: 'Last seen 2 hours ago',
      mutual: 4
    },
  ];

  const pendingRequests = [
    { id: 1, name: 'John Doe', username: 'john_dev', avatar: '👨‍💻', incoming: true },
    { id: 2, name: 'Jane Smith', username: 'jane_design', avatar: '👩‍🎨', incoming: true },
  ];

  const suggestions = [
    { id: 1, name: 'Tom Ops', username: 'tom_ops', avatar: '⚙️', mutual: 8 },
    { id: 2, name: 'Lisa API', username: 'lisa_api', avatar: '🔧', mutual: 6 },
    { id: 3, name: 'Kate Design', username: 'kate_design', avatar: '🎨', mutual: 5 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-[240px] border-r border-border">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm bg-accent">
              <Users className="h-4 w-4" />
              All Friends
              <span className="ml-auto text-xs text-muted-foreground">{friends.length}</span>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Pending
              <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5">
                {pendingRequests.length}
              </span>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <UserPlus className="h-4 w-4" />
              Suggestions
              <span className="ml-auto text-xs text-muted-foreground">{suggestions.length}</span>
            </Button>

            <Separator className="my-4" />

            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Direct Messages
            </div>

            {friends.slice(0, 5).map((friend) => (
              <Button key={friend.id} variant="ghost" className="w-full justify-start gap-2 text-sm">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <span className="text-lg">{friend.avatar}</span>
                  </Avatar>
                  <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(friend.status)}`} />
                </div>
                <span className="truncate">{friend.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Friends</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search friends..." 
                className="pl-10"
              />
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Friend
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                    Pending — {pendingRequests.length}
                  </h2>
                </div>

                {pendingRequests.map((request) => (
                  <div key={request.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/5 transition-colors">
                    <Avatar className="h-12 w-12">
                      <span className="text-2xl">{request.avatar}</span>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{request.name}</p>
                        {request.incoming && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                            Incoming
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">@{request.username}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="default">
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator />
              </div>
            )}

            {/* All Friends */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                All Friends — {friends.length}
              </h2>

              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:bg-accent/5 transition-colors">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <span className="text-2xl">{friend.avatar}</span>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-card ${getStatusColor(friend.status)}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{friend.name}</p>
                    <p className="text-sm text-muted-foreground">@{friend.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{friend.activity}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" title="Message">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Voice Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Video Call">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="More">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Friend Suggestions */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                Suggestions — {suggestions.length}
              </h2>

              <div className="grid grid-cols-3 gap-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="rounded-lg border border-border bg-card p-4 text-center hover:bg-accent/5 transition-colors">
                    <Avatar className="h-16 w-16 mx-auto mb-3">
                      <span className="text-3xl">{suggestion.avatar}</span>
                    </Avatar>
                    
                    <p className="font-semibold mb-1">{suggestion.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">@{suggestion.username}</p>
                    <p className="text-xs text-muted-foreground mb-4">
                      {suggestion.mutual} mutual friends
                    </p>

                    <Button variant="outline" size="sm" className="w-full">
                      <UserPlus className="h-3 w-3 mr-2" />
                      Add Friend
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function Users(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
