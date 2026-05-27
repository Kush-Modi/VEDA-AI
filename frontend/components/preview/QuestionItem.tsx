import { Question } from '@/types/assignment';
import { DifficultyBadge } from './DifficultyBadge';

interface QuestionItemProps {
  question: Question;
  index: number;
}

export function QuestionItem({ question, index }: QuestionItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors group">
      <span className="font-bold text-lg min-w-[24px]">{index}.</span>
      <div className="flex-1 space-y-2">
        <p className="text-base text-foreground leading-relaxed">{question.text}</p>
        <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-sm font-medium text-muted-foreground">[{question.marks} Mark{question.marks !== 1 ? 's' : ''}]</span>
        </div>
      </div>
    </div>
  );
}
