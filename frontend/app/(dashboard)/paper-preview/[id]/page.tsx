'use client';

import { usePaperStore } from '@/store/paperStore';
import { QuestionPaper } from '@/components/preview/QuestionPaper';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function PaperPreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const { generatedPaper, assignmentId, setPaper, loading, setLoading } = usePaperStore();
  const { token } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && id) {
      // If we already have the right paper in store, don't fetch
      if (generatedPaper && assignmentId === id) {
        return;
      }
      
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/paper/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.paper) {
            setPaper(data.paper, id);
          } else {
            setLoading(false); // Make sure to clear loading if failed
          }
        })
        .catch(err => console.error("Error fetching paper on load:", err))
        .finally(() => setLoading(false));
    }
  }, [isMounted, id, generatedPaper, assignmentId, setPaper, setLoading, token]);

  if (!isMounted) return null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Loading your paper...</h2>
      </div>
    );
  }

  if (!generatedPaper) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-bold mb-4">No paper generated yet</h2>
        <Button asChild>
          <Link href="/create-assignment">Create an Assignment</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <QuestionPaper paper={generatedPaper} />
    </div>
  );
}
