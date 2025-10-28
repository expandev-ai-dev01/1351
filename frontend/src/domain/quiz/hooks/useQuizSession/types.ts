import type { DifficultyLevel } from '../../types';

export interface UseQuizSessionOptions {
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export interface UseQuizSessionReturn {
  sessionId: string | null;
  isCreating: boolean;
  createSession: (
    nivel_dificuldade: DifficultyLevel,
    quantidade_perguntas: number
  ) => Promise<void>;
  error: Error | null;
}
