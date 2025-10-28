import { useState, useEffect, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizResultOptions, UseQuizResultReturn } from './types';
import type { QuizResult } from '../../types';

/**
 * @hook useQuizResult
 * @summary Manages quiz result retrieval
 * @domain quiz
 * @type domain-hook
 * @category data
 */
export const useQuizResult = (options: UseQuizResultOptions): UseQuizResultReturn => {
  const { sessionId, enabled = true, onError } = options;

  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResult = useCallback(async () => {
    if (!sessionId || !enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await quizService.getResult(sessionId);
      setResult(data);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erro ao carregar resultado');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, enabled, onError]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return {
    result,
    isLoading,
    error,
    refetch: fetchResult,
  };
};
