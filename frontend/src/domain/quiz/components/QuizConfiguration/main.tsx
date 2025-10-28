import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { QuizConfigurationProps } from './types';
import type { DifficultyLevel } from '../../types';

/**
 * @component QuizConfiguration
 * @summary Quiz configuration form for difficulty and question count
 * @domain quiz
 * @type domain-component
 * @category form
 */
export const QuizConfiguration = (props: QuizConfigurationProps) => {
  const { onStart, isLoading = false } = props;

  const [nivelDificuldade, setNivelDificuldade] = useState<DifficultyLevel>('fácil');
  const [quantidadePerguntas, setQuantidadePerguntas] = useState<number>(10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(nivelDificuldade, quantidadePerguntas);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurar Quiz</h2>
          <p className="text-gray-600">
            Escolha o nível de dificuldade e a quantidade de perguntas
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nível de Dificuldade
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['fácil', 'médio', 'difícil'] as DifficultyLevel[]).map((nivel) => (
                <button
                  key={nivel}
                  type="button"
                  onClick={() => setNivelDificuldade(nivel)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    nivelDificuldade === nivel
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium capitalize">{nivel}</span>
                  <span className="block text-xs text-gray-500 mt-1">
                    {nivel === 'fácil' && '5 pontos'}
                    {nivel === 'médio' && '10 pontos'}
                    {nivel === 'difícil' && '15 pontos'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade de Perguntas
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[5, 10, 15, 20].map((qtd) => (
                <button
                  key={qtd}
                  type="button"
                  onClick={() => setQuantidadePerguntas(qtd)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    quantidadePerguntas === qtd
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{qtd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
            Iniciar Quiz
          </Button>
        </div>
      </form>
    </Card>
  );
};
