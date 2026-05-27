import { Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Library() {
  const papers = [
    { title: 'Midterm Examination', subject: 'Science', class: 'Class 10', date: 'May 2026' },
    { title: 'Weekly Quiz', subject: 'Math', class: 'Class 8', date: 'Apr 2026' },
    { title: 'Final Assessment', subject: 'History', class: 'Class 9', date: 'Mar 2026' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Library</h1>
          <p className="text-slate-500 mt-1">Access all your previously generated papers.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search papers..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((p, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-slate-400">{p.date}</span>
            </div>
            <h3 className="text-lg font-bold mb-1 text-slate-900 line-clamp-1">{p.title}</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">{p.subject} • {p.class}</p>
            <div className="mt-auto">
              <Button variant="outline" className="w-full rounded-full font-bold">View Paper</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
