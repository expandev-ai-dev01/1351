import type { QuizAnswer } from '../../types';

export interface UseQuizAnswerOptions {
  sessionId: string;
  onSuccess?: (answer: QuizAnswer) => void;
  onError?: (error: Error) => void;
}

export interface UseQuizAnswerReturn {
  submitAnswer: (resposta_selecionada: string) => Promise<void>;
  isSubmitting: boolean;
  lastAnswer: QuizAnswer | null;
  error: Error | null;
}
