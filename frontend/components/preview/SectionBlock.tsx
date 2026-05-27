import { PaperSection } from '@/types/assignment';
import { QuestionItem } from './QuestionItem';

interface SectionBlockProps {
  section: PaperSection;
  startIndex: number;
}

export function SectionBlock({ section, startIndex }: SectionBlockProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold border-b border-border/60 pb-2">{section.title}</h3>
      <div className="space-y-2">
        {section.questions.map((q, idx) => (
          <QuestionItem key={`${section.title}-${idx}-${q.text}`} question={q} index={startIndex + idx} />
        ))}
      </div>
    </div>
  );
}
