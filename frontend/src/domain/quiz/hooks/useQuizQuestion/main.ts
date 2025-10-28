import { useState, useEffect, useCallback } from 'react';
import { quizService } from '../../services/quizService';
import type { UseQuizQuestionOptions, UseQuizQuestionReturn } from './types';
import type { QuizQuestion, HintType } from '../../types';

/**
 * @hook useQuizQuestion
 * @summary Manages current quiz question and hints
 * @domain quiz
 * @type domain-hook
 * @category data
 */
export const useQuizQuestion = (options: UseQuizQuestionOptions): UseQuizQuestionReturn => {
  const { sessionId, onTimeExpired, onError } = options;

  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRequestingHint, setIsRequestingHint] = useState(false);

  const fetchQuestion = useCallback(async () => {
    if (!sessionId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await quizService.getQuestion(sessionId);
      setQuestion(data);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('Erro ao carregar pergunta');
      setError(error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, onError]);

  const requestHint = useCallback(
    async (tipo_dica: HintType) => {
      if (!sessionId) return;

      setIsRequestingHint(true);

      try {
        const hint = await quizService.requestHint({ id_sessao: sessionId, tipo_dica });

        if (hint.alternativas && question) {
          setQuestion({ ...question, alternativas: hint.alternativas });
        }
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Erro ao solicitar dica');
        onError?.(error);
      } finally {
        setIsRequestingHint(false);
      }
    },
    [sessionId, question, onError]
  );

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  useEffect(() => {
    if (!question) return;

    const timer = setInterval(() => {
      setQuestion((prev) => {
        if (!prev) return prev;

        const newTime = prev.tempo_restante - 1;

        if (newTime <= 0) {
          onTimeExpired?.();
          return { ...prev, tempo_restante: 0 };
        }

        return { ...prev, tempo_restante: newTime };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question?.id_pergunta, onTimeExpired]);

  return {
    question,
    isLoading,
    error,
    refetch: fetchQuestion,
    requestHint,
    isRequestingHint,
  };
};
