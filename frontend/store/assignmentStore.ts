import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Assignment, QuestionType, GeneratedPaper } from '../types/assignment';
import { mockAssignments } from '../data/mockAssignments';

interface AssignmentState {
  assignments: Assignment[];
  uploadedFile: File | null;
  questionTypes: QuestionType[];
  generatedPaper: GeneratedPaper | null;
  
  addAssignment: (assignment: Assignment) => void;
  removeAssignment: (id: string) => void;
  setFile: (file: File | null) => void;
  updateQuestionTypes: (types: QuestionType[]) => void;
  setGeneratedPaper: (paper: GeneratedPaper | null) => void;
}

export const useAssignmentStore = create<AssignmentState>()(
  persist(
    (set) => ({
      assignments: mockAssignments,
      uploadedFile: null,
      questionTypes: [
        { id: '1', text: 'Multiple Choice Questions', difficulty: 'Moderate', marks: 1, count: 5 }
      ],
      generatedPaper: null,
      
      addAssignment: (assignment) => set((state) => ({ 
        assignments: [...state.assignments, assignment] 
      })),
      
      removeAssignment: (id) => set((state) => ({
        assignments: state.assignments.filter(a => a.id !== id)
      })),
      
      setFile: (file) => set({ uploadedFile: file }),
      
      updateQuestionTypes: (types) => set({ questionTypes: types }),
      
      setGeneratedPaper: (paper) => set({ generatedPaper: paper })
    }),
    {
      name: 'veda-store',
      partialize: (state) => ({
        assignments: state.assignments,
        questionTypes: state.questionTypes,
        generatedPaper: state.generatedPaper,
        // File cannot be serialized natively by JSON.stringify
      })
    }
  )
);
