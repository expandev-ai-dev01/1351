import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { QuizQuestionCardProps } from './types';

/**
 * @component QuizQuestionCard
 * @summary Displays quiz question with alternatives and hints
 * @domain quiz
 * @type domain-component
 * @category display
 */
export const QuizQuestionCard = (props: QuizQuestionCardProps) => {
  const {
    question,
    onAnswer,
    onHintEliminate,
    onHintCuriosity,
    hintsAvailable,
    isSubmitting = false,
    isRequestingHint = false,
    showFeedback = false,
    feedbackMessage,
    isCorrect,
  } = props;

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelectAnswer = (resposta: string) => {
    if (showFeedback || isSubmitting) return;
    setSelectedAnswer(resposta);
    onAnswer(resposta);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">{question.progresso}</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Tempo:</span>
            <span
              className={`text-lg font-bold ${
                question.tempo_restante <= 10 ? 'text-error-600' : 'text-primary-600'
              }`}
            >
              {question.tempo_restante}s
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Qual é a capital de {question.pais}?
          </h3>

          <div className="space-y-3">
            {question.alternativas.map((alternativa, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(alternativa)}
                disabled={showFeedback || isSubmitting}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  selectedAnswer === alternativa
                    ? showFeedback
                      ? isCorrect
                        ? 'border-success-600 bg-success-50'
                        : 'border-error-600 bg-error-50'
                      : 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${
                  showFeedback || isSubmitting ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                }`}
              >
                <span className="font-medium">{alternativa}</span>
              </button>
            ))}
          </div>
        </div>

        {showFeedback && feedbackMessage && (
          <div
            className={`p-4 rounded-lg ${
              isCorrect ? 'bg-success-50 text-success-800' : 'bg-error-50 text-error-800'
            }`}
          >
            <p className="font-medium">{feedbackMessage}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{hintsAvailable}</span> dicas disponíveis
          </div>

          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onHintEliminate}
              disabled={hintsAvailable === 0 || showFeedback || isRequestingHint}
            >
              Eliminar alternativa
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onHintCuriosity}
              disabled={hintsAvailable === 0 || showFeedback || isRequestingHint}
            >
              Ver curiosidade
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
