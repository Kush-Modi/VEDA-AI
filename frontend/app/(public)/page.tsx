'use client';

import Link from 'next/link';
import { ArrowRight, Bot, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
            <Bot className="w-4 h-4" />
            <span>AI-Powered Education</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Create Assessments <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              in Seconds, Not Hours
            </span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            VedaAI analyzes your course material and instantly generates tailored question papers, complete with answer keys and difficulty balancing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/login" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            Log in to VedaAI <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/signup" 
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-full font-bold hover:bg-slate-50 hover:scale-105 transition-all text-center"
          >
            Create Free Account
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Save 90% Time</h3>
            <p className="text-slate-500">Stop typing out questions manually. Upload a syllabus and let AI do the heavy lifting instantly.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">High Quality</h3>
            <p className="text-slate-500">Generates strictly verified, curriculum-aligned questions that test true understanding, not just memory.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-left">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Secure & Private</h3>
            <p className="text-slate-500">Your uploaded course materials are never used to train public models. Enterprise-grade security.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
