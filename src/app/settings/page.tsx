'use client';

import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Settings,
  Bell,
  Shield,
  Lock,
  Eye,
  MessageSquare,
  Users,
  Palette,
  Zap,
  Download,
  Upload,
  Trash2,
  Save,
  X,
  Check
} from 'lucide-react';

export default function SettingsPage() {
  const [hasChanges, setHasChanges] = useState(false);

  const settingsSections = [
    {
      title: 'My Account',
      icon: Settings,
      items: [
        { label: 'Username', value: 'cryptk1ddo', type: 'text' },
        { label: 'Email', value: 'user@syncord.app', type: 'email' },
        { label: 'Phone Number', value: '+1 (555) 123-4567', type: 'tel' },
      ]
    },
    {
      title: 'Privacy & Safety',
      icon: Shield,
      items: [
        { label: 'Direct Messages', value: 'Friends Only', type: 'select' },
        { label: 'Server Privacy', value: 'Everyone', type: 'select' },
        { label: 'Data & Privacy', value: 'Manage', type: 'button' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Enable Desktop Notifications', value: true, type: 'toggle' },
        { label: 'Enable Mobile Push', value: true, type: 'toggle' },
        { label: 'Enable Email Notifications', value: false, type: 'toggle' },
        { label: 'DM Notification Sound', value: true, type: 'toggle' },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Theme', value: 'Dark', type: 'select' },
        { label: 'Message Display', value: 'Cozy', type: 'select' },
        { label: 'Font Size', value: '16px', type: 'select' },
      ]
    },
    {
      title: 'Voice & Video',
      icon: MessageSquare,
      items: [
        { label: 'Input Device', value: 'Default', type: 'select' },
        { label: 'Output Device', value: 'Default', type: 'select' },
        { label: 'Echo Cancellation', value: true, type: 'toggle' },
        { label: 'Noise Suppression', value: true, type: 'toggle' },
      ]
    },
  ];

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-[240px] border-r border-border">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1">
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
              User Settings
            </div>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Settings className="h-4 w-4" />
              My Account
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Privacy & Safety
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Bell className="h-4 w-4" />
              Notifications
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Palette className="h-4 w-4" />
              Appearance
            </Button>
            
            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <MessageSquare className="h-4 w-4" />
              Voice & Video
            </Button>

            <Separator className="my-4" />

            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
              App Settings
            </div>

            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Zap className="h-4 w-4" />
              Activity Status
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Users className="h-4 w-4" />
              Connections
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Lock className="h-4 w-4" />
              Security
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-2 text-sm">
              <Eye className="h-4 w-4" />
              Authorized Apps
            </Button>

            <Separator className="my-4" />

            <Button variant="ghost" className="w-full justify-start gap-2 text-sm text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex h-[60px] items-center justify-between border-b border-border px-6">
          <div>
            <h1 className="text-xl font-semibold">My Account</h1>
            <p className="text-sm text-muted-foreground">Manage your Syncord account settings</p>
          </div>
          
          <div className="flex items-center gap-2">
            {hasChanges && (
              <>
                <Button variant="ghost" size="sm" onClick={() => setHasChanges(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={() => setHasChanges(false)}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-[800px] p-6 space-y-8">
            {/* Settings Sections */}
            {settingsSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <label className="text-sm font-medium">
                            {item.label}
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {item.type === 'toggle' && (
                            <button
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                item.value ? 'bg-primary' : 'bg-muted'
                              }`}
                              onClick={() => setHasChanges(true)}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                                  item.value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          )}
                          
                          {item.type === 'text' || item.type === 'email' || item.type === 'tel' && (
                            <Input
                              type={item.type}
                              defaultValue={item.value as string}
                              className="w-[300px]"
                              onChange={() => setHasChanges(true)}
                            />
                          )}
                          
                          {item.type === 'select' && (
                            <select 
                              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              defaultValue={item.value as string}
                              onChange={() => setHasChanges(true)}
                            >
                              <option>{item.value as string}</option>
                            </select>
                          )}
                          
                          {item.type === 'button' && (
                            <Button variant="outline" size="sm">
                              {item.value as string}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {index < settingsSections.length - 1 && <Separator />}
              </div>
            ))}

            {/* Data Management */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Data Management</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <Download className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Download Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Request a copy of your Syncord data
                  </p>
                  <Button variant="outline" className="w-full">
                    Request Archive
                  </Button>
                </div>

                <div className="rounded-lg border border-border bg-card p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">Import Data</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Import data from another platform
                  </p>
                  <Button variant="outline" className="w-full">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
              
              <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
