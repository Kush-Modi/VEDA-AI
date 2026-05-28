'use client';

import { GeneratedPaper } from '@/types/assignment';
import { SectionBlock } from './SectionBlock';
import { StudentInfo } from './StudentInfo';
import { Download, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useRef, useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GeneratedPDF } from './PDFDocument';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface QuestionPaperProps {
  paper: GeneratedPaper;
}

export function QuestionPaper({ paper }: QuestionPaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-in fade-in zoom-in-95 duration-500 pt-6">
      <div className="relative z-30 bg-slate-900 text-slate-50 p-6 md:p-8 rounded-t-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden mx-2 md:mx-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="flex gap-4 items-start w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/10 shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0 z-10">
            AI
          </div>
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-semibold">
              Here are customized question papers...
            </h2>
            <p className="text-slate-400 mt-2">Ready to download and print for your students.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10">
          <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-full h-12 px-6">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
          {isClient ? (
            <PDFDownloadLink
              document={<GeneratedPDF paper={paper} user={user} />}
              fileName="Question_Paper.pdf"
            >
              {({ loading }) => (
                <Button disabled={loading} className="w-full bg-white text-slate-900 hover:bg-slate-200 rounded-full shadow-lg font-bold h-12 px-6">
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? 'Preparing...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          ) : (
            <Button disabled className="w-full bg-white text-slate-900 rounded-full shadow-lg font-bold h-12 px-6">
              <Download className="w-4 h-4 mr-2" />
              Preparing...
            </Button>
          )}
        </div>
      </div>

      <div 
        ref={paperRef} 
        className="bg-white p-8 md:p-14 lg:p-20 rounded-b-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] min-h-[800px] border border-slate-100 mx-2 md:mx-0 relative z-0"
      >
        <div className="text-center space-y-4 mb-10 pb-10 border-b-2 border-slate-800">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-slate-900">
            {user?.school || 'School Name'}
          </h1>
          <h2 className="text-xl text-slate-600 font-medium">{(user as any)?.schoolLocation || ''}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm font-semibold bg-slate-50 p-4 rounded-xl">
            <div className="flex flex-col"><span className="text-slate-500 text-xs uppercase tracking-wider mb-1">Subject</span> {paper.subject}</div>
            <div className="flex flex-col"><span className="text-slate-500 text-xs uppercase tracking-wider mb-1">Class</span> {paper.class}</div>
            <div className="flex flex-col"><span className="text-slate-500 text-xs uppercase tracking-wider mb-1">Time Allowed</span> {paper.timeAllowed}</div>
            <div className="flex flex-col"><span className="text-slate-500 text-xs uppercase tracking-wider mb-1">Max Marks</span> {paper.maximumMarks}</div>
          </div>
        </div>

        <StudentInfo />

        <div className="space-y-12 mt-12">
          {paper.sections.map((section, idx) => {
            const currentCounter = paper.sections.slice(0, idx).reduce((acc, curr) => acc + curr.questions.length, 0) + 1;
            
            return (
              <SectionBlock 
                key={idx} 
                section={section} 
                startIndex={currentCounter} 
              />
            );
          })}
        </div>

        <div className="mt-24 pt-12 border-t-2 border-dashed border-slate-300">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Answer Key
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium uppercase tracking-wider">Teachers Only</span>
          </h3>
          <div className="p-6 bg-slate-50 rounded-xl text-slate-600 italic">
            Answer key section content would be rendered here based on generated answers.
          </div>
        </div>
      </div>
    </div>
  );
}
