import type { QuizResult } from '../../types';

export interface UseQuizResultOptions {
  sessionId: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
}

export interface UseQuizResultReturn {
  result: QuizResult | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
