import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { QuizResultCardProps } from './types';

/**
 * @component QuizResultCard
 * @summary Displays quiz results with performance summary
 * @domain quiz
 * @type domain-component
 * @category display
 */
export const QuizResultCard = (props: QuizResultCardProps) => {
  const { result, onRestart, onViewHistory } = props;

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Concluído!</h2>
          <p className="text-lg text-gray-600">{result.mensagem_desempenho}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6">
          <div className="p-4 bg-primary-50 rounded-lg">
            <div className="text-3xl font-bold text-primary-600">{result.pontuacao_total}</div>
            <div className="text-sm text-gray-600 mt-1">Pontuação Total</div>
          </div>

          <div className="p-4 bg-success-50 rounded-lg">
            <div className="text-3xl font-bold text-success-600">
              {result.percentual_acertos.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 mt-1">Taxa de Acerto</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900">{result.total_acertos}</div>
            <div className="text-sm text-gray-600 mt-1">Acertos</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900">{result.total_erros}</div>
            <div className="text-sm text-gray-600 mt-1">Erros</div>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Button size="lg" fullWidth onClick={onRestart}>
            Fazer Novo Quiz
          </Button>
          <Button variant="secondary" size="lg" fullWidth onClick={onViewHistory}>
            Ver Histórico
          </Button>
        </div>
      </div>
    </Card>
  );
};
