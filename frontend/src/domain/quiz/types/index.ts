export type DifficultyLevel = 'fácil' | 'médio' | 'difícil';
export type HintType = 'eliminar_alternativa' | 'mostrar_curiosidade';

export interface QuizConfiguration {
  id_sessao: string;
  nivel_dificuldade: DifficultyLevel;
  quantidade_perguntas: number;
  dicas_disponiveis: number;
}

export interface QuizQuestion {
  id_pergunta: number;
  pais: string;
  alternativas: string[];
  tempo_restante: number;
  progresso: string;
}

export interface QuizAnswer {
  resposta_correta: boolean;
  pontos_obtidos: number;
  mensagem_feedback: string;
  capital_correta?: string;
}

export interface QuizHint {
  curiosidade?: string;
  alternativas?: string[];
}

export interface QuizResult {
  pontuacao_total: number;
  total_acertos: number;
  total_erros: number;
  percentual_acertos: number;
  mensagem_desempenho: string;
  data_hora_conclusao: string;
}

export interface QuizHistoryRecord {
  id_sessao: string;
  data_hora_conclusao: string;
  nivel_dificuldade: DifficultyLevel;
  quantidade_perguntas: number;
  pontuacao_total: number;
  percentual_acertos: number;
}
