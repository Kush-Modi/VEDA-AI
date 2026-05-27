'use client';

import { QuestionType } from '@/types/assignment';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface QuestionTypeRowProps {
  questionType: QuestionType;
  onUpdate: (id: string, field: keyof QuestionType, value: string | number) => void;
  onRemove: (id: string) => void;
}

const QUESTION_TYPES = [
  "Multiple Choice Questions",
  "Short Questions",
  "Diagram/Graph Questions",
  "Numerical Problems"
];

const DIFFICULTIES = ["Easy", "Moderate", "Hard"];

export function QuestionTypeRow({ questionType, onUpdate, onRemove }: QuestionTypeRowProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-2">
      <div className="w-full md:w-5/12">
        <Select 
          value={questionType.text} 
          onValueChange={(val) => onUpdate(questionType.id, 'text', val)}
        >
          <SelectTrigger className="bg-white border-slate-200 shadow-sm h-11 rounded-xl">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {QUESTION_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between w-full md:flex-1 gap-4">
        {/* No. Questions Control */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">No. Questions</span>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-lg bg-white shadow-sm border border-slate-100 hover:text-primary hover:border-primary/30"
              onClick={() => onUpdate(questionType.id, 'count', Math.max(1, questionType.count - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center font-bold text-slate-700">{questionType.count}</span>
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-lg bg-white shadow-sm border border-slate-100 hover:text-primary hover:border-primary/30"
              onClick={() => onUpdate(questionType.id, 'count', questionType.count + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Marks Control */}
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-1">Marks</span>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-lg bg-white shadow-sm border border-slate-100 hover:text-primary hover:border-primary/30"
              onClick={() => onUpdate(questionType.id, 'marks', Math.max(1, questionType.marks - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center font-bold text-slate-700">{questionType.marks}</span>
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-lg bg-white shadow-sm border border-slate-100 hover:text-primary hover:border-primary/30"
              onClick={() => onUpdate(questionType.id, 'marks', questionType.marks + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            onClick={() => onRemove(questionType.id)}
            className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl w-10 h-10 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
