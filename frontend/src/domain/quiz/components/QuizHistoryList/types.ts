import type { QuizHistoryRecord } from '../../types';

export interface QuizHistoryListProps {
  records: QuizHistoryRecord[];
  bestScore: number;
  onBack: () => void;
}
