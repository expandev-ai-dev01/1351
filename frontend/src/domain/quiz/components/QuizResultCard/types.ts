import type { QuizResult } from '../../types';

export interface QuizResultCardProps {
  result: QuizResult;
  onRestart: () => void;
  onViewHistory: () => void;
}
