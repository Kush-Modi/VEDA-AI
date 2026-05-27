'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

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
            <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary h-9 w-9">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-1.5 pr-2 md:pr-3 py-1 h-9 rounded-full hover:bg-secondary flex items-center gap-2 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] uppercase">
                    {user?.name?.[0] || 'U'}
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
