import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GeneratedPaper } from '@/types/assignment';

interface PaperState {
  generatedPaper: GeneratedPaper | null;
  assignmentId: string | null;
  loading: boolean;
  setPaper: (paper: GeneratedPaper, assignmentId: string) => void;
  clearPaper: () => void;
  setLoading: (loading: boolean) => void;
}

export const usePaperStore = create<PaperState>()(
  persist(
    (set) => ({
      generatedPaper: null,
      assignmentId: null,
      loading: false,
      setPaper: (paper, assignmentId) => set({ generatedPaper: paper, assignmentId, loading: false }),
      clearPaper: () => set({ generatedPaper: null, assignmentId: null, loading: false }),
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'vedaai-paper-storage',
    }
  )
);
