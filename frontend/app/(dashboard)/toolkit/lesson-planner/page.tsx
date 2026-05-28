'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, Loader2, ArrowLeft, Target, List, Clock, Repeat, BookCheck } from 'lucide-react';
import Link from 'next/link';

interface LessonPlanResult {
  subtopics: string[];
  learningObjectives: string[];
  teachingFlow: { time: string; activity: string }[];
  recapTopics: string[];
  homeworkSuggestions: string[];
}

export default function LessonPlanner() {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [className, setClassName] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LessonPlanResult | null>(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
      const token = localStorage.getItem('vedaai_token');

      const res = await fetch(`${baseUrl}/api/toolkit/lesson-planner`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, chapterName: chapter, className, duration }),
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
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="shrink-0 text-slate-500 hover:text-slate-900">
          <Link href="/toolkit">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            AI Lesson Planner
          </h1>
          <p className="text-slate-500 mt-1">Generate beautifully structured lesson outlines instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm h-fit sticky top-24">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
              <input 
                type="text" 
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Science"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Class / Grade</label>
              <input 
                type="text" 
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. 10th Grade"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Chapter Name</label>
              <input 
                type="text" 
                required
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Light Reflection"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Duration</label>
              <input 
                type="text" 
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 45 mins"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold shadow-[0_5px_15px_rgba(79,70,229,0.3)] transition-all hover:-translate-y-0.5 text-base mt-4"
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

        <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200 min-h-[500px]">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-60 py-20">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-600 font-semibold animate-pulse text-lg">Designing curriculum...</p>
            </div>
          ) : result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
              <div className="border-b border-slate-200 pb-6 mb-6">
                <h2 className="text-3xl font-extrabold text-slate-900">{chapter}</h2>
                <div className="flex gap-4 mt-3 text-sm font-semibold text-slate-500">
                  <span className="bg-white px-3 py-1 rounded-md border border-slate-200">{subject}</span>
                  <span className="bg-white px-3 py-1 rounded-md border border-slate-200">{className}</span>
                  <span className="bg-white px-3 py-1 rounded-md border border-slate-200">{duration}</span>
                </div>
              </div>

              {/* Objectives */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-emerald-500" />
                  Learning Objectives
                </h3>
                <ul className="space-y-2">
                  {result.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                      <span className="text-slate-700 font-medium">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subtopics */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <List className="w-5 h-5 text-blue-500" />
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.subtopics.map((topic, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold border border-blue-100">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flow Timeline */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Teaching Flow
                </h3>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {result.teachingFlow.map((flow, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 font-bold text-xs shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                        {i+1}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="text-amber-600 font-bold text-xs mb-1 uppercase tracking-wider">{flow.time}</div>
                        <div className="text-slate-800 font-medium text-sm">{flow.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recap & Homework */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Repeat className="w-5 h-5 text-purple-500" />
                    Recap
                  </h3>
                  <ul className="space-y-2">
                    {result.recapTopics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 font-bold text-sm mt-0.5">•</span>
                        <span className="text-slate-700 text-sm font-medium">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <BookCheck className="w-5 h-5 text-rose-500" />
                    Homework
                  </h3>
                  <ul className="space-y-2">
                    {result.homeworkSuggestions.map((hw, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold text-sm mt-0.5">•</span>
                        <span className="text-slate-700 text-sm font-medium">{hw}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4 py-20">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-slate-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-700 mb-1">Ready to Plan</h3>
                <p className="max-w-xs text-sm">Fill out the details on the left to generate an AI-powered lesson outline.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
