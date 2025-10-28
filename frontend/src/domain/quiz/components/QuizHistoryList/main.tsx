import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { QuizHistoryListProps } from './types';

/**
 * @component QuizHistoryList
 * @summary Displays quiz history with past results
 * @domain quiz
 * @type domain-component
 * @category display
 */
export const QuizHistoryList = (props: QuizHistoryListProps) => {
  const { records, bestScore, onBack } = props;

  if (records.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Histórico de Pontuações</h2>
          <p className="text-gray-600">Você ainda não completou nenhum quiz</p>
          <Button onClick={onBack}>Voltar</Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Histórico de Pontuações</h2>
          <div className="text-right">
            <div className="text-sm text-gray-600">Melhor Pontuação</div>
            <div className="text-2xl font-bold text-primary-600">{bestScore}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {records.map((record) => (
          <Card key={record.id_sessao} variant="outline">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(record.data_hora_conclusao), "dd 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(record.data_hora_conclusao), 'HH:mm')}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        record.nivel_dificuldade === 'fácil'
                          ? 'bg-success-100 text-success-800'
                          : record.nivel_dificuldade === 'médio'
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-error-100 text-error-800'
                      }`}
                    >
                      {record.nivel_dificuldade}
                    </span>
                    <span className="text-sm text-gray-600">
                      {record.quantidade_perguntas} perguntas
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{record.pontuacao_total}</div>
                  <div className="text-sm text-gray-600">pontos</div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary-600">
                    {record.percentual_acertos.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">acertos</div>
                </div>

                {record.pontuacao_total === bestScore && (
                  <div className="text-yellow-500">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="secondary" onClick={onBack}>
          Voltar
        </Button>
      </div>
    </div>
  );
};
