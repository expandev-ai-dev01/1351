import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import {
  quizCreate,
  quizGetQuestion,
  quizSubmitAnswer,
  quizRequestHint,
  quizGetResult,
  DifficultyLevel,
  HintType,
} from '@/services/quiz';

/**
 * @api {post} /external/quiz Create Quiz Session
 * @apiName CreateQuiz
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new quiz session with specified configuration
 *
 * @apiParam {String} nivel_dificuldade Difficulty level ('fácil', 'médio', 'difícil')
 * @apiParam {Number} quantidade_perguntas Number of questions (5, 10, 15, or 20)
 *
 * @apiSuccess {String} id_sessao Session identifier
 * @apiSuccess {String} nivel_dificuldade Selected difficulty level
 * @apiSuccess {Number} quantidade_perguntas Number of questions
 * @apiSuccess {Number} dicas_disponiveis Available hints (3)
 *
 * @apiError {String} ValidationError Invalid parameters provided
 */
export async function createHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const bodySchema = z.object({
    nivel_dificuldade: z.nativeEnum(DifficultyLevel),
    quantidade_perguntas: z
      .number()
      .int()
      .refine((val) => [5, 10, 15, 20].includes(val), {
        message: 'Quantidade deve ser 5, 10, 15 ou 20',
      }),
  });

  try {
    const validated = bodySchema.parse(req.body);
    const configuration = await quizCreate(validated);
    res.json(successResponse(configuration));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      res.status(400).json(errorResponse(error.message, 'BAD_REQUEST'));
    }
  }
}

/**
 * @api {get} /external/quiz/:id_sessao/question Get Current Question
 * @apiName GetQuestion
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the current question for the quiz session
 *
 * @apiParam {String} id_sessao Session identifier
 *
 * @apiSuccess {Number} id_pergunta Question ID
 * @apiSuccess {String} pais Country name
 * @apiSuccess {String[]} alternativas Answer options (4 items)
 * @apiSuccess {Number} tempo_restante Remaining time (30 seconds)
 * @apiSuccess {String} progresso Progress indicator
 *
 * @apiError {String} NotFound Session not found
 */
export async function getQuestionHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id_sessao: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const question = await quizGetQuestion(validated);
    res.json(successResponse(question));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    }
  }
}

/**
 * @api {post} /external/quiz/:id_sessao/answer Submit Answer
 * @apiName SubmitAnswer
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits answer for current question
 *
 * @apiParam {String} id_sessao Session identifier
 * @apiParam {String} resposta_selecionada Selected answer
 *
 * @apiSuccess {Boolean} resposta_correta Whether answer is correct
 * @apiSuccess {Number} pontos_obtidos Points earned
 * @apiSuccess {String} mensagem_feedback Feedback message
 *
 * @apiError {String} NotFound Session not found
 */
export async function submitAnswerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id_sessao: z.string().uuid(),
  });

  const bodySchema = z.object({
    resposta_selecionada: z.string().min(1),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const answer = await quizSubmitAnswer({
      id_sessao: validatedParams.id_sessao,
      resposta_selecionada: validatedBody.resposta_selecionada,
    });

    res.json(successResponse(answer));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    }
  }
}

/**
 * @api {post} /external/quiz/:id_sessao/hint Request Hint
 * @apiName RequestHint
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Requests a hint for current question
 *
 * @apiParam {String} id_sessao Session identifier
 * @apiParam {String} tipo_dica Hint type ('eliminar_alternativa' or 'mostrar_curiosidade')
 *
 * @apiSuccess {String} [curiosidade] Country curiosity (if tipo_dica is 'mostrar_curiosidade')
 * @apiSuccess {String[]} [alternativas] Updated alternatives (if tipo_dica is 'eliminar_alternativa')
 *
 * @apiError {String} NotFound Session not found
 * @apiError {String} BadRequest No hints available
 */
export async function requestHintHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id_sessao: z.string().uuid(),
  });

  const bodySchema = z.object({
    tipo_dica: z.nativeEnum(HintType),
  });

  try {
    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const hint = await quizRequestHint({
      id_sessao: validatedParams.id_sessao,
      tipo_dica: validatedBody.tipo_dica,
    });

    res.json(successResponse(hint));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      res.status(400).json(errorResponse(error.message, 'BAD_REQUEST'));
    }
  }
}

/**
 * @api {get} /external/quiz/:id_sessao/result Get Quiz Result
 * @apiName GetResult
 * @apiGroup Quiz
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets the final results of completed quiz
 *
 * @apiParam {String} id_sessao Session identifier
 *
 * @apiSuccess {Number} pontuacao_total Total score
 * @apiSuccess {Number} total_acertos Number of correct answers
 * @apiSuccess {Number} total_erros Number of incorrect answers
 * @apiSuccess {Number} percentual_acertos Percentage of correct answers
 * @apiSuccess {String} mensagem_desempenho Performance message
 * @apiSuccess {String} data_hora_conclusao Completion timestamp
 *
 * @apiError {String} NotFound Session not found
 * @apiError {String} BadRequest Quiz not completed
 */
export async function getResultHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const paramsSchema = z.object({
    id_sessao: z.string().uuid(),
  });

  try {
    const validated = paramsSchema.parse(req.params);
    const result = await quizGetResult(validated);
    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse(error.errors[0].message, 'VALIDATION_ERROR'));
    } else {
      res.status(404).json(errorResponse(error.message, 'NOT_FOUND'));
    }
  }
}
