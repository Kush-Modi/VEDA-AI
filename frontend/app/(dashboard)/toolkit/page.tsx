import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Toolkit() {

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">AI Teacher Toolkit</h1>
        <p className="text-slate-500 mt-1">Explore our suite of AI tools designed for educators.</p>
      </div>

        <Link href="/toolkit/lesson-planner">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Lesson Planner</h3>
            <p className="text-slate-500 leading-relaxed max-w-sm">Outline complete lesson plans with AI assistance. Simply input your subject and topic to get started.</p>
            <div className="mt-8 px-6 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-full group-hover:bg-indigo-100 transition-colors">
              Get Started
            </div>
          </div>
        </Link>
    </div>
  );
}
