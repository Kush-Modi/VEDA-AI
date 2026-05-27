export type Difficulty = "Easy" | "Moderate" | "Hard";

export interface QuestionType {
  id: string;
  text: string;
  difficulty: Difficulty;
  marks: number;
  count: number;
}

export interface Question {
  id: string;
  text: string;
  marks: number;
  difficulty: Difficulty;
}

export interface PaperSection {
  title: string;
  questions: Question[];
}

export interface GeneratedPaper {
  id: string;
  subject: string;
  class: string;
  timeAllowed: string;
  maximumMarks: number;
  sections: PaperSection[];
}

export interface Assignment {
  id: string;
  title: string;
  assignedDate: string;
  dueDate: string;
}
