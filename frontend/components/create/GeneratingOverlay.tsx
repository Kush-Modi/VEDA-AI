import { useEffect, useState } from 'react';
import { getSocket } from '../../services/socket';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { usePaperStore } from '@/store/paperStore';

interface GeneratingOverlayProps {
  assignmentId: string;
  onComplete: () => void;
}

export function GeneratingOverlay({ assignmentId, onComplete }: GeneratingOverlayProps) {
  const [progress, setProgress] = useState(0);

  const setPaper = usePaperStore(state => state.setPaper);

  useEffect(() => {
    const socket = getSocket();

    const onProgress = (data: { assignmentId: string; progress: number }) => {
      if (data.assignmentId === assignmentId) {
        setProgress(data.progress);
      }
    };

    const onCompleted = async (data: { assignmentId: string }) => {
      if (data.assignmentId === assignmentId) {
        setProgress(100);
        console.log("Socket complete");
        console.log("Fetching paper");
        
        try {
          const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
          const token = localStorage.getItem('vedaai_token');
          
          const res = await fetch(`${baseUrl}/api/paper/${assignmentId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const result = await res.json();
          
          if (result.success && result.paper) {
            console.log("Paper loaded");
            setPaper(result.paper, assignmentId);
            toast.success('Question paper generated successfully!');
          } else {
            toast.error('Failed to load generated paper');
          }
        } catch (err) {
          console.error("Error fetching paper:", err);
          toast.error('Error fetching generated paper');
        }

        setTimeout(() => {
          onComplete();
        }, 500); // short delay for visual completion
      }
    };

    const onFailed = (data: { assignmentId: string, error?: string }) => {
      if (data.assignmentId === assignmentId) {
        toast.error('AI Generation Failed: ' + (data.error || 'Unknown error'));
        // We can call onComplete or another handler to dismiss the overlay
        setTimeout(() => {
          onComplete(); // we'll just dismiss for now, user can see toast
        }, 1000);
      }
    };

    socket.on('generation-progress', onProgress);
    socket.on('generation-completed', onCompleted);
    socket.on('generation-failed', onFailed);

    return () => {
      socket.off('generation-progress', onProgress);
      socket.off('generation-completed', onCompleted);
      socket.off('generation-failed', onFailed);
    };
  }, [assignmentId, onComplete]);

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full mx-4 border border-slate-100">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Creating Question Paper...</h3>
        <p className="text-slate-500 text-center mb-8">
          AI is analyzing the materials and generating questions based on your specifications.
        </p>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 text-sm font-bold text-slate-400">
          {progress}% Complete
        </div>
      </div>
    </div>
  );
}
