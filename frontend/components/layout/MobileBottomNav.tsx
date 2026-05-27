'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, BookOpen, Wrench, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: FileText, label: 'Assignments', href: '/assignments' },
  { icon: BookOpen, label: 'Library', href: '/library' },
  { icon: Wrench, label: 'AI Toolkit', href: '/toolkit' },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Floating Action Button */}
      <div className="md:hidden fixed bottom-24 right-4 z-50">
        <Button asChild size="icon" className="w-[60px] h-[60px] rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center">
          <Link href="/create-assignment">
            <Plus className="w-8 h-8" />
          </Link>
        </Button>
      </div>

      {/* Bottom Nav Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-card border-t border-border z-40 px-6 pb-safe flex items-center justify-between shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
              <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
