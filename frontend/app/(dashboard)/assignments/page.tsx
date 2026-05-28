'use client';

import { AssignmentGrid } from '@/components/assignment/AssignmentGrid';
import { NoAssignmentsIllustration } from '@/components/assignment/NoAssignmentsIllustration';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assignment`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setAssignments(data.data);
      })
      .catch(err => console.error("Error fetching assignments:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/assignment/${id}`, { 
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAssignments(prev => prev.filter(a => a._id !== id));
      }
    } catch (err) {
      console.error("Error deleting assignment:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-in fade-in zoom-in duration-500">
        <div className="mb-8">
          <NoAssignmentsIllustration />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">No assignments yet</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Create your first assignment to start collecting and grading student submissions. You can set up rubrics and let AI assist.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-lg shadow-primary/25 transition-all hover:scale-105">
          <Link href="/create-assignment">
            Create Your First Assignment
          </Link>
        </Button>
      </div>
    );
  }

  return <AssignmentGrid assignments={assignments} onDelete={handleDelete} />;
}
