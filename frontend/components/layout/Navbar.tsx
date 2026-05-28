'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated, token } = useAuth();
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!token) return;
    const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
    fetch(`${baseUrl}/api/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setNotifications(data.data);
          setUnreadCount(data.data.filter((n: any) => !n.read).length);
        }
      })
      .catch(err => console.error("Error fetching notifications:", err));
  }, [token]);

  const markAsRead = async (id: string) => {
    if (!token) return;
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      await fetch(`${baseUrl}/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      await fetch(`${baseUrl}/api/notifications/read-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  // Simple mapping for page titles based on pathname
  let pageTitle = 'VedaAI';
  if (pathname.includes('/assignments')) pageTitle = 'Assignments';
  if (pathname.includes('/create-assignment')) pageTitle = 'Create Assignment';
  if (pathname.includes('/paper-preview')) pageTitle = 'Paper Preview';
  if (pathname.includes('/dashboard')) pageTitle = 'Dashboard';
  if (pathname.includes('/settings')) pageTitle = 'Settings';
  if (pathname.includes('/profile')) pageTitle = 'Profile';
  if (pathname.includes('/groups')) pageTitle = 'Groups';
  if (pathname.includes('/toolkit')) pageTitle = 'AI Toolkit';
  if (pathname.includes('/library')) pageTitle = 'Library';

  return (
    <div className="px-4 md:px-8 pt-4 pb-2 sticky top-0 z-40 bg-[#f8f9fa]">
      <header className="h-14 border border-border/50 bg-white shadow-sm rounded-2xl flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {pathname !== '/' && pathname !== '/assignments' && (
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-secondary h-8 w-8">
              <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
          <h2 className="text-lg font-semibold text-foreground">{pageTitle}</h2>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary h-9 w-9">
                  <Bell className="w-4 h-4 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 border border-slate-100 shadow-xl rounded-2xl overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-xs font-semibold text-primary hover:text-primary/80">
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">
                      No notifications yet.
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n._id} 
                        onClick={() => !n.read && markAsRead(n._id)}
                        className={`p-4 border-b border-slate-50 cursor-pointer transition-colors ${n.read ? 'opacity-60 bg-white' : 'bg-orange-50/50 hover:bg-orange-50'}`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-sm text-slate-900">{n.title}</h4>
                          <span className="text-[10px] text-slate-400">
                            {new Date(n.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-1.5 pr-2 md:pr-3 py-1 h-9 rounded-full hover:bg-secondary flex items-center gap-2 border border-slate-100">
                  <div className="w-7 h-7 rounded-full border border-primary/20 bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary font-bold text-[10px] uppercase">{user?.name?.[0] || 'U'}</span>
                    )}
                  </div>
                  <span className="hidden md:inline-block font-medium text-sm text-slate-700">{user?.name || 'User'}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400 hidden md:inline-block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild><Link href="/profile" className="w-full cursor-pointer">Profile</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/settings" className="w-full cursor-pointer">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
    </header>
    </div>
  );
}
