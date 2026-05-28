'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Group {
  _id: string;
  className: string;
  section: string;
  subject: string;
  description: string;
  assignmentsCount: number;
}

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ className: '', section: '', subject: '', description: '' });
  const { token } = useAuth();

  useEffect(() => {
    fetchGroups();
  }, [token]);

  const fetchGroups = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/groups`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setGroups(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/groups`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setGroups([data.data, ...groups]);
        setIsCreating(false);
        setFormData({ className: '', section: '', subject: '', description: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this group? All associated assignments will also be deleted.') || !token) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/groups/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setGroups(groups.filter(g => g._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Groups</h1>
          <p className="text-slate-500 mt-1">Manage your student classes and subjects.</p>
        </div>
        <Button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-slate-900 text-white rounded-full font-bold px-6 shrink-0"
        >
          {isCreating ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Create Group</>}
        </Button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Class Name</label>
              <input required value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} placeholder="e.g. 10th Grade" className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Section</label>
              <input required value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} placeholder="e.g. A" className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <input required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Science" className="w-full mt-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">Save Group</Button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : groups.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No groups yet</h3>
          <p className="text-slate-500 mt-2">Create your first class/group to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((g) => (
            <div key={g._id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group/card">
              <button 
                onClick={() => handleDelete(g._id)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover/card:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover/card:bg-primary group-hover/card:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-slate-900">{g.className} - {g.section}</h3>
              <p className="text-sm font-medium text-slate-500">{g.subject}</p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-sm font-bold text-slate-700">
                <span>{g.assignmentsCount || 0} Assignments</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
