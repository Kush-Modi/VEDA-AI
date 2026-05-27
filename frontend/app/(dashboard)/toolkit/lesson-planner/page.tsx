'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LessonPlanner() {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; subtopics: string[] } | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/toolkit/lesson-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, chapter, class: className }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Failed to generate lesson plan');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="shrink-0 text-slate-500 hover:text-slate-900">
          <Link href="/toolkit">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            Lesson Planner
          </h1>
          <p className="text-slate-500 mt-1">Generate structured lesson outlines with AI assistance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm h-fit">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
              <input 
                type="text" 
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Science, Mathematics"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Class / Grade</label>
              <input 
                type="text" 
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. 10th Grade, Year 8"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Chapter Name</label>
              <input 
                type="text" 
                required
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Light Reflection and Refraction"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold shadow-md shadow-indigo-200 transition-all text-base mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                'Generate Lesson Plan'
              )}
            </Button>
          </form>
        </div>

        <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 min-h-[400px]">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-200">
                {result.title}
              </h2>
              <ul className="space-y-3">
                {result.subtopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 text-base leading-relaxed">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
              <BookOpen className="w-16 h-16 opacity-20" />
              <p>Fill out the form to generate an AI-powered lesson outline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
