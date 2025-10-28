import { publicClient } from '@/core/lib/api';
import type {
  QuizConfiguration,
  QuizQuestion,
  QuizAnswer,
  QuizHint,
  QuizResult,
  DifficultyLevel,
  HintType,
} from '../types';

/**
 * @service quizService
 * @summary Quiz service for all quiz-related backend operations
 * @domain quiz
 * @type rest-service
 * @apiContext external
 */
export const quizService = {
  /**
   * @endpoint POST /api/v1/external/quiz
   * @summary Creates a new quiz session
   */
  async create(data: {
    nivel_dificuldade: DifficultyLevel;
    quantidade_perguntas: number;
  }): Promise<QuizConfiguration> {
    const response = await publicClient.post('/quiz', data);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:id_sessao/question
   * @summary Gets the current question for the quiz session
   */
  async getQuestion(id_sessao: string): Promise<QuizQuestion> {
    const response = await publicClient.get(`/quiz/${id_sessao}/question`);
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/quiz/:id_sessao/answer
   * @summary Submits answer for current question
   */
  async submitAnswer(data: {
    id_sessao: string;
    resposta_selecionada: string;
  }): Promise<QuizAnswer> {
    const response = await publicClient.post(`/quiz/${data.id_sessao}/answer`, {
      resposta_selecionada: data.resposta_selecionada,
    });
    return response.data.data;
  },

  /**
   * @endpoint POST /api/v1/external/quiz/:id_sessao/hint
   * @summary Requests a hint for current question
   */
  async requestHint(data: { id_sessao: string; tipo_dica: HintType }): Promise<QuizHint> {
    const response = await publicClient.post(`/quiz/${data.id_sessao}/hint`, {
      tipo_dica: data.tipo_dica,
    });
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/quiz/:id_sessao/result
   * @summary Gets the final results of completed quiz
   */
  async getResult(id_sessao: string): Promise<QuizResult> {
    const response = await publicClient.get(`/quiz/${id_sessao}/result`);
    return response.data.data;
  },
};
