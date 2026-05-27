import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Groups() {
  const groups = [
    { name: 'Class A', students: 30, subject: 'Science' },
    { name: 'Class B', students: 28, subject: 'Mathematics' },
    { name: 'Science Club', students: 15, subject: 'Extracurricular' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Groups</h1>
          <p className="text-slate-500 mt-1">Manage your student classes and clubs.</p>
        </div>
        <Button className="hidden md:flex bg-slate-900 text-white rounded-full font-bold px-6">
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-1 text-slate-900">{g.name}</h3>
            <p className="text-sm font-medium text-slate-500">{g.subject}</p>
            <div className="mt-6 pt-4 border-t border-slate-100 text-sm font-bold text-slate-700">
              {g.students} Students
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
