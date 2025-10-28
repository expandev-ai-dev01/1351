import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizConfiguration } from '@/domain/quiz/components/QuizConfiguration';
import { QuizQuestionCard } from '@/domain/quiz/components/QuizQuestionCard';
import { QuizResultCard } from '@/domain/quiz/components/QuizResultCard';
import { QuizHistoryList } from '@/domain/quiz/components/QuizHistoryList';
import { useQuizSession } from '@/domain/quiz/hooks/useQuizSession';
import { useQuizQuestion } from '@/domain/quiz/hooks/useQuizQuestion';
import { useQuizAnswer } from '@/domain/quiz/hooks/useQuizAnswer';
import { useQuizResult } from '@/domain/quiz/hooks/useQuizResult';
import { useQuizHistoryStore } from '@/domain/quiz/stores/quizHistoryStore';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { DifficultyLevel, QuizAnswer } from '@/domain/quiz/types';

type QuizStage = 'config' | 'question' | 'result' | 'history';

/**
 * @page QuizPage
 * @summary Main quiz page managing quiz flow
 * @domain quiz
 * @type page-component
 * @category quiz-management
 *
 * @routing
 * - Path: /quiz
 * - Guards: None (public page)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Dynamic based on quiz stage
 *
 * @userFlows
 * - Primary: Configure quiz → Answer questions → View results
 * - Secondary: View history of past quizzes
 */
export const QuizPage = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState<QuizStage>('config');
  const [hintsAvailable, setHintsAvailable] = useState(3);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerData, setLastAnswerData] = useState<QuizAnswer | null>(null);

  const { addRecord, getRecords, getBestScore } = useQuizHistoryStore();

  const { sessionId, isCreating, createSession } = useQuizSession({
    onComplete: () => {
      setStage('question');
      setCurrentQuestionNumber(1);
    },
  });

  const {
    question,
    isLoading: isLoadingQuestion,
    requestHint,
    isRequestingHint,
  } = useQuizQuestion({
    sessionId: sessionId || '',
    onTimeExpired: () => {
      if (!showFeedback) {
        submitAnswer('');
      }
    },
  });

  const { submitAnswer, isSubmitting } = useQuizAnswer({
    sessionId: sessionId || '',
    onSuccess: (answer) => {
      setLastAnswerData(answer);
      setShowFeedback(true);

      setTimeout(() => {
        setShowFeedback(false);
        setLastAnswerData(null);

        if (currentQuestionNumber >= totalQuestions) {
          setStage('result');
        } else {
          setCurrentQuestionNumber((prev) => prev + 1);
        }
      }, 3000);
    },
  });

  const { result, isLoading: isLoadingResult } = useQuizResult({
    sessionId: sessionId || '',
    enabled: stage === 'result',
  });

  useEffect(() => {
    if (result && stage === 'result') {
      addRecord({
        id_sessao: sessionId!,
        data_hora_conclusao: result.data_hora_conclusao,
        nivel_dificuldade: 'fácil',
        quantidade_perguntas: totalQuestions,
        pontuacao_total: result.pontuacao_total,
        percentual_acertos: result.percentual_acertos,
      });
    }
  }, [result, stage, sessionId, totalQuestions, addRecord]);

  const handleStartQuiz = async (
    nivel_dificuldade: DifficultyLevel,
    quantidade_perguntas: number
  ) => {
    setTotalQuestions(quantidade_perguntas);
    setHintsAvailable(3);
    await createSession(nivel_dificuldade, quantidade_perguntas);
  };

  const handleAnswer = (resposta: string) => {
    submitAnswer(resposta);
  };

  const handleHintEliminate = async () => {
    if (hintsAvailable > 0) {
      await requestHint('eliminar_alternativa');
      setHintsAvailable((prev) => prev - 1);
    }
  };

  const handleHintCuriosity = async () => {
    if (hintsAvailable > 0) {
      await requestHint('mostrar_curiosidade');
      setHintsAvailable((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setStage('config');
    setHintsAvailable(3);
    setCurrentQuestionNumber(1);
  };

  const handleViewHistory = () => {
    setStage('history');
  };

  const handleBackFromHistory = () => {
    setStage('config');
  };

  if (stage === 'config') {
    return <QuizConfiguration onStart={handleStartQuiz} isLoading={isCreating} />;
  }

  if (stage === 'question') {
    if (isLoadingQuestion || !question) {
      return <LoadingSpinner />;
    }

    return (
      <QuizQuestionCard
        question={question}
        onAnswer={handleAnswer}
        onHintEliminate={handleHintEliminate}
        onHintCuriosity={handleHintCuriosity}
        hintsAvailable={hintsAvailable}
        isSubmitting={isSubmitting}
        isRequestingHint={isRequestingHint}
        showFeedback={showFeedback}
        feedbackMessage={lastAnswerData?.mensagem_feedback}
        isCorrect={lastAnswerData?.resposta_correta}
      />
    );
  }

  if (stage === 'result') {
    if (isLoadingResult || !result) {
      return <LoadingSpinner />;
    }

    return (
      <QuizResultCard result={result} onRestart={handleRestart} onViewHistory={handleViewHistory} />
    );
  }

  if (stage === 'history') {
    return (
      <QuizHistoryList
        records={getRecords()}
        bestScore={getBestScore()}
        onBack={handleBackFromHistory}
      />
    );
  }

  return null;
};

export default QuizPage;
