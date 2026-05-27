'use client';

import { useAuth } from '@/contexts/AuthContext';
import { User, Calendar, BookOpen, Clock } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative">
          <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-full p-2">
            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-slate-400" />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-8 px-8">
          <h1 className="text-3xl font-extrabold text-slate-900">{user?.name || 'Teacher Profile'}</h1>
          <p className="text-slate-500 text-lg mt-1">{user?.role === 'teacher' ? 'Educator' : user?.role}</p>
          
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span>Joined May 2026</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <User className="w-5 h-5 text-slate-400" />
              <span>{user?.school || 'No School Associated'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">12</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Assessments Created</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">45 hrs</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Time Saved with AI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
