import type { QuizQuestion, HintType } from '../../types';

export interface UseQuizQuestionOptions {
  sessionId: string;
  onTimeExpired?: () => void;
  onError?: (error: Error) => void;
}

export interface UseQuizQuestionReturn {
  question: QuizQuestion | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  requestHint: (tipo_dica: HintType) => Promise<void>;
  isRequestingHint: boolean;
}
