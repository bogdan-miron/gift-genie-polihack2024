import { create } from 'zustand';

interface GiftFinderStore {
  answers: Record<string, string[]>;
  setAnswers: (answers: Record<string, string[]>) => void;
  clearAnswers: () => void;
}

export const useGiftFinderStore = create<GiftFinderStore>((set) => ({
  answers: {},
  setAnswers: (answers) => set({ answers }),
  clearAnswers: () => set({ answers: {} }),
}));
