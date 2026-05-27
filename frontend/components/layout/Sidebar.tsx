'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, Wrench, BookOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Users, label: 'My Groups', href: '/groups' },
  { icon: FileText, label: 'Assignments', href: '/assignments' },
  { icon: Wrench, label: 'AI Teacher Toolkit', href: '/toolkit' },
  { icon: BookOpen, label: 'My Library', href: '/library' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [assignmentsCount, setAssignmentsCount] = useState(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assignment`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setAssignmentsCount(data.data.length);
        }
      })
      .catch(err => console.error("Error fetching assignments:", err));
  }, []);

  return (
    <aside className="hidden md:flex flex-col w-[250px] border-r border-border bg-card h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <span className="bg-primary text-primary-foreground p-1 rounded-md text-sm">V</span>
          VedaAI
        </h1>
      </div>

      <div className="px-4 mb-6">
        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-orange-500/50 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]">
          <Link href="/create-assignment">
            + Create Assignment
          </Link>
        </Button>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const badgeValue = item.label === 'Assignments' ? assignmentsCount : (item as any).badge;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-secondary text-foreground font-semibold" 
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                {item.label}
              </div>
              {badgeValue > 0 && (
                <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {badgeValue}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all mb-4"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Link>
        
        <div className="bg-secondary/50 p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0 uppercase">
            {user?.name?.[0] || 'U'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm text-foreground truncate">{user?.name || 'Loading...'}</span>
            <span className="text-xs text-muted-foreground truncate">{user?.school || 'No school set'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
