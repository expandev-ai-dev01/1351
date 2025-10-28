import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuizHistoryRecord } from '../types';

interface QuizHistoryState {
  records: QuizHistoryRecord[];
  addRecord: (record: QuizHistoryRecord) => void;
  getRecords: (dificuldade?: string) => QuizHistoryRecord[];
  getBestScore: () => number;
  clearHistory: () => void;
}

/**
 * @store quizHistoryStore
 * @summary Zustand store for quiz history management with persistence
 * @domain quiz
 * @type domain-store
 * @category quiz-data
 * @stateManager zustand
 */
export const useQuizHistoryStore = create<QuizHistoryState>()(
  persist(
    (set, get) => ({
      records: [],

      addRecord: (record) =>
        set((state) => {
          const newRecords = [record, ...state.records].slice(0, 10);
          return { records: newRecords };
        }),

      getRecords: (dificuldade) => {
        const { records } = get();
        if (!dificuldade || dificuldade === 'todos') {
          return records;
        }
        return records.filter((r) => r.nivel_dificuldade === dificuldade);
      },

      getBestScore: () => {
        const { records } = get();
        if (records.length === 0) return 0;
        return Math.max(...records.map((r) => r.pontuacao_total));
      },

      clearHistory: () => set({ records: [] }),
    }),
    {
      name: 'quiz-history-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
