'use client';

import { useAuth } from '@/contexts/AuthContext';
import { FileText, Users, Clock, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assignment`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAssignments(data.data);
        }
      })
      .catch(err => console.error("Error fetching dashboard stats:", err))
      .finally(() => setLoading(false));
  }, [token]);

  const totalAssignments = assignments.length;
  const completedAssignments = assignments.filter(a => a.status === 'completed').length;
  const processingAssignments = assignments.filter(a => ['processing', 'pending'].includes(a.status)).length;
  const recentAssignments = [...assignments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, {user?.name || 'Teacher'}!</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your assessments today.</p>
        </div>
        <Link 
          href="/create-assignment" 
          className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <PlusCircle className="w-5 h-5" />
          Create Assessment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '-' : totalAssignments}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Assignments</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '-' : completedAssignments}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Generated Papers</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '-' : processingAssignments}</div>
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pending Review</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {loading ? (
              <p className="text-slate-500">Loading...</p>
            ) : recentAssignments.length === 0 ? (
              <p className="text-slate-500">No assignments created yet.</p>
            ) : (
              recentAssignments.map((assignment) => (
                <div key={assignment._id} className="flex items-start gap-4 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1">
                    <FileText className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">{assignment.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 flex gap-2 items-center">
                      <span className={assignment.status === 'completed' ? 'text-green-500' : assignment.status === 'processing' ? 'text-orange-500' : 'text-slate-500'}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </p>
                    <p className="text-xs text-slate-400 mt-2">{new Date(assignment.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8 h-fit">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/create-assignment" className="block w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors">
              Create New Assignment
            </Link>
            <Link href="/library" className="block w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors">
              Browse Saved Papers
            </Link>
            <Link href="/groups" className="block w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors">
              Manage Student Groups
            </Link>
            <Link href="/toolkit" className="block w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 font-medium text-slate-700 transition-colors">
              Explore AI Toolkit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
