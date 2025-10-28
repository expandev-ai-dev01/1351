/**
 * @summary
 * Quiz service type definitions
 *
 * @description
 * Type definitions for quiz configuration, questions, answers, and results
 */

/**
 * @enum DifficultyLevel
 * @description Quiz difficulty levels
 */
export enum DifficultyLevel {
  Easy = 'fácil',
  Medium = 'médio',
  Hard = 'difícil',
}

/**
 * @enum HintType
 * @description Types of hints available to users
 */
export enum HintType {
  EliminateOption = 'eliminar_alternativa',
  ShowCuriosity = 'mostrar_curiosidade',
}

/**
 * @interface Country
 * @description Country data structure from JSON file
 *
 * @property {string} country - Country name
 * @property {string} capital - Capital city name
 * @property {string} difficulty - Difficulty level
 * @property {string} curiosity - Interesting fact about the country
 */
export interface Country {
  country: string;
  capital: string;
  difficulty: string;
  curiosity: string;
}

/**
 * @interface QuizConfiguration
 * @description Quiz session configuration
 *
 * @property {DifficultyLevel} nivel_dificuldade - Selected difficulty level
 * @property {number} quantidade_perguntas - Number of questions (5, 10, 15, or 20)
 * @property {string} id_sessao - Unique session identifier (UUID)
 * @property {number} dicas_disponiveis - Available hints (0-3)
 */
export interface QuizConfiguration {
  nivel_dificuldade: DifficultyLevel;
  quantidade_perguntas: number;
  id_sessao: string;
  dicas_disponiveis: number;
}

/**
 * @interface QuizQuestion
 * @description Quiz question structure
 *
 * @property {number} id_pergunta - Question sequential ID
 * @property {string} pais - Country name
 * @property {string} capital_correta - Correct capital
 * @property {string[]} alternativas - Answer options (4 items)
 * @property {number} tempo_restante - Remaining time in seconds
 * @property {string} progresso - Progress indicator (e.g., '1 de 10')
 * @property {string | null} curiosidade - Country curiosity (shown with hint)
 */
export interface QuizQuestion {
  id_pergunta: number;
  pais: string;
  capital_correta: string;
  alternativas: string[];
  tempo_restante: number;
  progresso: string;
  curiosidade: string | null;
}

/**
 * @interface QuizAnswer
 * @description User answer and feedback
 *
 * @property {string} resposta_selecionada - Selected answer
 * @property {boolean} resposta_correta - Whether answer is correct
 * @property {number} pontos_obtidos - Points earned (0, 5, 10, or 15)
 * @property {string} mensagem_feedback - Feedback message
 */
export interface QuizAnswer {
  resposta_selecionada: string;
  resposta_correta: boolean;
  pontos_obtidos: number;
  mensagem_feedback: string;
}

/**
 * @interface QuizResult
 * @description Quiz completion results
 *
 * @property {number} pontuacao_total - Total score
 * @property {number} total_acertos - Number of correct answers
 * @property {number} total_erros - Number of incorrect/unanswered questions
 * @property {number} percentual_acertos - Percentage of correct answers
 * @property {string} mensagem_desempenho - Performance message
 * @property {string} data_hora_conclusao - Completion timestamp (ISO 8601)
 */
export interface QuizResult {
  pontuacao_total: number;
  total_acertos: number;
  total_erros: number;
  percentual_acertos: number;
  mensagem_desempenho: string;
  data_hora_conclusao: string;
}

/**
 * @interface QuizHistoryRecord
 * @description Historical quiz record
 *
 * @property {string} data_hora_conclusao - Completion timestamp
 * @property {DifficultyLevel} nivel_dificuldade - Difficulty level
 * @property {number} quantidade_perguntas - Number of questions
 * @property {number} pontuacao_total - Total score
 * @property {number} percentual_acertos - Percentage of correct answers
 */
export interface QuizHistoryRecord {
  data_hora_conclusao: string;
  nivel_dificuldade: DifficultyLevel;
  quantidade_perguntas: number;
  pontuacao_total: number;
  percentual_acertos: number;
}

/**
 * @interface QuizHistory
 * @description Quiz history data
 *
 * @property {QuizHistoryRecord[]} registros_historico - History records (max 10)
 * @property {number} melhor_pontuacao - Best score achieved
 */
export interface QuizHistory {
  registros_historico: QuizHistoryRecord[];
  melhor_pontuacao: number;
}

/**
 * @interface QuizSession
 * @description Active quiz session state
 *
 * @property {QuizConfiguration} configuration - Session configuration
 * @property {QuizQuestion[]} questions - All session questions
 * @property {number} current_question_index - Current question index
 * @property {QuizAnswer[]} answers - User answers
 * @property {number} score - Current score
 */
export interface QuizSession {
  configuration: QuizConfiguration;
  questions: QuizQuestion[];
  current_question_index: number;
  answers: QuizAnswer[];
  score: number;
}
