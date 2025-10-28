import { useState, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizSessionOptions, UseQuizSessionReturn } from './types';
import type { DifficultyLevel } from '../../types';

/**
 * @hook useQuizSession
 * @summary Manages quiz session creation
 * @domain quiz
 * @type domain-hook
 * @category data
 */
export const useQuizSession = (options: UseQuizSessionOptions = {}): UseQuizSessionReturn => {
  const { onComplete, onError } = options;

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createSession = useCallback(
    async (nivel_dificuldade: DifficultyLevel, quantidade_perguntas: number) => {
      setIsCreating(true);
      setError(null);

      try {
        const config = await quizService.create({
          nivel_dificuldade,
          quantidade_perguntas,
        });

        setSessionId(config.id_sessao);
        onComplete?.();
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Erro ao criar sessão');
        setError(error);
        onError?.(error);
      } finally {
        setIsCreating(false);
      }
    },
    [onComplete, onError]
  );

  return {
    sessionId,
    isCreating,
    createSession,
    error,
  };
};
