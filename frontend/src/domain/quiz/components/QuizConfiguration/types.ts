import type { DifficultyLevel } from '../../types';

export interface QuizConfigurationProps {
  onStart: (nivel_dificuldade: DifficultyLevel, quantidade_perguntas: number) => void;
  isLoading?: boolean;
}
