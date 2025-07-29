export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string;
  reference?: string;
}

export interface QuizData {
  category: string;
  title: string;
  description: string;
  total: number;
  questions: QuizQuestion[];
}

export type QuizCollection = Record<string, QuizData>;