import { create } from 'zustand';
import { questions } from './questions';

export interface ImageChoice {
  id: string;
  title: string;
  image: string;
}

export interface TextChoice {
  id: string;
  title: string;
}

export interface BaseQuestion {
  id: string;
  question: string;
  multiSelect?: boolean;
}

export interface ImageQuestion extends BaseQuestion {
  type: 'image';
  choices: ImageChoice[];
  answers: String[]
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  choices: TextChoice[];
  answers: String[]
}

export type Question = ImageQuestion | TextQuestion;

interface GiftFinderStore {
  answers: Record<string, string[]>;
  setAnswers: (answers: Record<string, string[]>) => void;
  clearAnswers: () => void;
  aiSuggestions: string | null;
  setAiSuggestions: (suggestions: string | null) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
}

export const useGiftFinderStore = create<GiftFinderStore>((set) => ({
  answers: {},
  setAnswers: (answers) => set({ answers }),
  clearAnswers: () => set({ answers: {} }),
  aiSuggestions: null,
  setAiSuggestions: (suggestions) => set({ aiSuggestions: suggestions }),
  questions: questions,
  setQuestions: (questions) => set({ questions })
}));
