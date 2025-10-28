import type { QuizQuestion } from '../../types';

export interface QuizQuestionCardProps {
  question: QuizQuestion;
  onAnswer: (resposta: string) => void;
  onHintEliminate: () => void;
  onHintCuriosity: () => void;
  hintsAvailable: number;
  isSubmitting?: boolean;
  isRequestingHint?: boolean;
  showFeedback?: boolean;
  feedbackMessage?: string;
  isCorrect?: boolean;
}
