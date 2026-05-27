import { Difficulty } from '@/types/assignment';
import { cn } from '@/lib/utils';

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const colors = {
    Easy: "bg-green-100 text-green-800 border-green-200",
    Moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Hard: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <span className={cn("text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider", colors[difficulty])}>
      {difficulty}
    </span>
  );
}
