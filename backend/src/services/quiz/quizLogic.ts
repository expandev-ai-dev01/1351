import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {
  Country,
  DifficultyLevel,
  QuizConfiguration,
  QuizQuestion,
  QuizAnswer,
  QuizResult,
  QuizSession,
  HintType,
} from './quizTypes';

/**
 * @summary
 * Quiz business logic implementation
 *
 * @description
 * Handles quiz session management, question generation, answer validation,
 * and score calculation using in-memory storage
 */

let countriesData: Country[] = [];
const activeSessions = new Map<string, QuizSession>();

/**
 * @summary
 * Load countries data from JSON file
 *
 * @function loadCountriesData
 * @module services/quiz
 *
 * @returns {Country[]} Array of countries
 *
 * @throws {Error} If JSON file cannot be read
 */
function loadCountriesData(): Country[] {
  if (countriesData.length === 0) {
    const dataPath = path.join(__dirname, '../../data/countries.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    countriesData = JSON.parse(rawData);
  }
  return countriesData;
}

/**
 * @summary
 * Get points value based on difficulty level
 *
 * @function getPointsForDifficulty
 * @module services/quiz
 *
 * @param {DifficultyLevel} difficulty - Difficulty level
 *
 * @returns {number} Points value (5, 10, or 15)
 */
function getPointsForDifficulty(difficulty: DifficultyLevel): number {
  switch (difficulty) {
    case DifficultyLevel.Easy:
      return 5;
    case DifficultyLevel.Medium:
      return 10;
    case DifficultyLevel.Hard:
      return 15;
    default:
      return 5;
  }
}

/**
 * @summary
 * Shuffle array using Fisher-Yates algorithm
 *
 * @function shuffleArray
 * @module services/quiz
 *
 * @param {T[]} array - Array to shuffle
 *
 * @returns {T[]} Shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * @summary
 * Generate quiz questions based on configuration
 *
 * @function generateQuestions
 * @module services/quiz
 *
 * @param {DifficultyLevel} difficulty - Difficulty level
 * @param {number} quantity - Number of questions
 *
 * @returns {QuizQuestion[]} Array of quiz questions
 *
 * @throws {Error} If not enough countries for selected difficulty
 */
function generateQuestions(difficulty: DifficultyLevel, quantity: number): QuizQuestion[] {
  const countries = loadCountriesData();
  const filteredCountries = countries.filter((c) => c.difficulty === difficulty);

  if (filteredCountries.length < quantity) {
    throw new Error(`Não há países suficientes para o nível ${difficulty}`);
  }

  const selectedCountries = shuffleArray(filteredCountries).slice(0, quantity);
  const questions: QuizQuestion[] = [];

  selectedCountries.forEach((country, index) => {
    const incorrectOptions = countries
      .filter((c) => c.capital !== country.capital)
      .map((c) => c.capital);

    const selectedIncorrect = shuffleArray(incorrectOptions).slice(0, 3);
    const allOptions = shuffleArray([country.capital, ...selectedIncorrect]);

    questions.push({
      id_pergunta: index + 1,
      pais: country.country,
      capital_correta: country.capital,
      alternativas: allOptions,
      tempo_restante: 30,
      progresso: `${index + 1} de ${quantity}`,
      curiosidade: country.curiosity,
    });
  });

  return questions;
}

/**
 * @summary
 * Create new quiz session
 *
 * @function quizCreate
 * @module services/quiz
 *
 * @param {object} params - Quiz creation parameters
 * @param {DifficultyLevel} params.nivel_dificuldade - Difficulty level
 * @param {number} params.quantidade_perguntas - Number of questions
 *
 * @returns {Promise<QuizConfiguration>} Quiz configuration with session ID
 *
 * @throws {Error} If invalid parameters
 */
export async function quizCreate(params: {
  nivel_dificuldade: DifficultyLevel;
  quantidade_perguntas: number;
}): Promise<QuizConfiguration> {
  const validQuantities = [5, 10, 15, 20];
  if (!validQuantities.includes(params.quantidade_perguntas)) {
    throw new Error('Selecione uma quantidade válida: 5, 10, 15 ou 20 perguntas');
  }

  const validDifficulties = Object.values(DifficultyLevel);
  if (!validDifficulties.includes(params.nivel_dificuldade)) {
    throw new Error('Selecione um nível de dificuldade válido: fácil, médio ou difícil');
  }

  const id_sessao = uuidv4();
  const configuration: QuizConfiguration = {
    nivel_dificuldade: params.nivel_dificuldade,
    quantidade_perguntas: params.quantidade_perguntas,
    id_sessao,
    dicas_disponiveis: 3,
  };

  const questions = generateQuestions(params.nivel_dificuldade, params.quantidade_perguntas);

  const session: QuizSession = {
    configuration,
    questions,
    current_question_index: 0,
    answers: [],
    score: 0,
  };

  activeSessions.set(id_sessao, session);

  return configuration;
}

/**
 * @summary
 * Get current question for session
 *
 * @function quizGetQuestion
 * @module services/quiz
 *
 * @param {object} params - Request parameters
 * @param {string} params.id_sessao - Session ID
 *
 * @returns {Promise<QuizQuestion>} Current question
 *
 * @throws {Error} If session not found or quiz completed
 */
export async function quizGetQuestion(params: { id_sessao: string }): Promise<QuizQuestion> {
  const session = activeSessions.get(params.id_sessao);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.current_question_index >= session.questions.length) {
    throw new Error('Quiz já foi concluído');
  }

  const question = session.questions[session.current_question_index];

  return {
    ...question,
    curiosidade: null,
  };
}

/**
 * @summary
 * Submit answer for current question
 *
 * @function quizSubmitAnswer
 * @module services/quiz
 *
 * @param {object} params - Answer parameters
 * @param {string} params.id_sessao - Session ID
 * @param {string} params.resposta_selecionada - Selected answer
 *
 * @returns {Promise<QuizAnswer>} Answer feedback
 *
 * @throws {Error} If session not found or answer already submitted
 */
export async function quizSubmitAnswer(params: {
  id_sessao: string;
  resposta_selecionada: string;
}): Promise<QuizAnswer> {
  const session = activeSessions.get(params.id_sessao);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.current_question_index >= session.questions.length) {
    throw new Error('Quiz já foi concluído');
  }

  const currentQuestion = session.questions[session.current_question_index];
  const isCorrect = params.resposta_selecionada === currentQuestion.capital_correta;
  const points = isCorrect ? getPointsForDifficulty(session.configuration.nivel_dificuldade) : 0;

  const answer: QuizAnswer = {
    resposta_selecionada: params.resposta_selecionada,
    resposta_correta: isCorrect,
    pontos_obtidos: points,
    mensagem_feedback: isCorrect
      ? 'Correto!'
      : `Incorreto! A resposta correta é: ${currentQuestion.capital_correta}`,
  };

  session.answers.push(answer);
  session.score += points;
  session.current_question_index++;

  return answer;
}

/**
 * @summary
 * Request hint for current question
 *
 * @function quizRequestHint
 * @module services/quiz
 *
 * @param {object} params - Hint request parameters
 * @param {string} params.id_sessao - Session ID
 * @param {HintType} params.tipo_dica - Hint type
 *
 * @returns {Promise<object>} Hint data
 *
 * @throws {Error} If no hints available or session not found
 */
export async function quizRequestHint(params: {
  id_sessao: string;
  tipo_dica: HintType;
}): Promise<{ curiosidade?: string; alternativas?: string[] }> {
  const session = activeSessions.get(params.id_sessao);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.configuration.dicas_disponiveis <= 0) {
    throw new Error('Você não possui mais dicas disponíveis');
  }

  const currentQuestion = session.questions[session.current_question_index];
  session.configuration.dicas_disponiveis--;

  if (params.tipo_dica === HintType.ShowCuriosity) {
    return {
      curiosidade: currentQuestion.curiosidade || '',
    };
  }

  if (params.tipo_dica === HintType.EliminateOption) {
    const incorrectOptions = currentQuestion.alternativas.filter(
      (alt) => alt !== currentQuestion.capital_correta
    );
    const toRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
    const newAlternatives = currentQuestion.alternativas.filter((alt) => alt !== toRemove);

    currentQuestion.alternativas = newAlternatives;

    return {
      alternativas: newAlternatives,
    };
  }

  return {};
}

/**
 * @summary
 * Get quiz results
 *
 * @function quizGetResult
 * @module services/quiz
 *
 * @param {object} params - Request parameters
 * @param {string} params.id_sessao - Session ID
 *
 * @returns {Promise<QuizResult>} Quiz results
 *
 * @throws {Error} If session not found or quiz not completed
 */
export async function quizGetResult(params: { id_sessao: string }): Promise<QuizResult> {
  const session = activeSessions.get(params.id_sessao);

  if (!session) {
    throw new Error('Sessão não encontrada');
  }

  if (session.current_question_index < session.questions.length) {
    throw new Error('Quiz ainda não foi concluído');
  }

  const total_acertos = session.answers.filter((a) => a.resposta_correta).length;
  const total_erros = session.answers.length - total_acertos;
  const percentual_acertos = (total_acertos / session.answers.length) * 100;

  let mensagem_desempenho = 'Continue praticando!';
  if (percentual_acertos >= 90) {
    mensagem_desempenho = 'Excelente!';
  } else if (percentual_acertos >= 70) {
    mensagem_desempenho = 'Muito bom!';
  } else if (percentual_acertos >= 50) {
    mensagem_desempenho = 'Bom trabalho!';
  }

  const result: QuizResult = {
    pontuacao_total: session.score,
    total_acertos,
    total_erros,
    percentual_acertos: parseFloat(percentual_acertos.toFixed(1)),
    mensagem_desempenho,
    data_hora_conclusao: new Date().toISOString(),
  };

  activeSessions.delete(params.id_sessao);

  return result;
}
