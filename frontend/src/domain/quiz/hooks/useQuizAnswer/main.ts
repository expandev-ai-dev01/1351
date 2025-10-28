import { useState, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizAnswerOptions, UseQuizAnswerReturn } from './types';
import type { QuizAnswer } from '../../types';

/**
 * @hook useQuizAnswer
 * @summary Manages quiz answer submission
 * @domain quiz
 * @type domain-hook
 * @category data
 */
export const useQuizAnswer = (options: UseQuizAnswerOptions): UseQuizAnswerReturn => {
  const { sessionId, onSuccess, onError } = options;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<QuizAnswer | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const submitAnswer = useCallback(
    async (resposta_selecionada: string) => {
      if (!sessionId) return;

      setIsSubmitting(true);
      setError(null);

      try {
        const answer = await quizService.submitAnswer({
          id_sessao: sessionId,
          resposta_selecionada,
        });

        setLastAnswer(answer);
        onSuccess?.(answer);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Erro ao enviar resposta');
        setError(error);
        onError?.(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [sessionId, onSuccess, onError]
  );

  return {
    submitAnswer,
    isSubmitting,
    lastAnswer,
    error,
  };
};
