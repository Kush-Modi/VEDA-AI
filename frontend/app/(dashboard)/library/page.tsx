'use client';

import { useState, useEffect } from 'react';
import { Search, FileText, Loader2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Library() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/paper/library`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setPapers(data.data);
        }
      })
      .catch(err => console.error("Error fetching library:", err))
      .finally(() => setLoading(false));
  }, [token]);

  const filteredPapers = papers.filter(p => {
    const title = p.assignmentId?.title?.toLowerCase() || '';
    const subject = p.assignmentId?.subject?.toLowerCase() || '';
    const className = p.assignmentId?.className?.toLowerCase() || '';
    const searchLower = search.toLowerCase();
    return title.includes(searchLower) || subject.includes(searchLower) || className.includes(searchLower);
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Library</h1>
          <p className="text-slate-500 mt-1">Access all your previously generated papers.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search papers..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : filteredPapers.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No papers found</h3>
          <p className="text-slate-500 mt-2">
            {search ? "No papers matched your search." : "You haven't generated any papers yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((p) => {
            const date = new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' });
            return (
              <div key={p._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {date}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1 text-slate-900 line-clamp-1">{p.assignmentId?.title || 'Untitled'}</h3>
                <p className="text-sm font-medium text-slate-500 mb-6">
                  {p.assignmentId?.subject || 'No Subject'} • {p.assignmentId?.className || 'No Class'}
                </p>
                <div className="mt-auto">
                  <Button asChild variant="outline" className="w-full rounded-full font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    <Link href={`/paper-preview/${p.assignmentId?._id}`}>
                      View Paper
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
