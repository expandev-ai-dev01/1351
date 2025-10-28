import { Router } from 'express';
import {
  createHandler,
  getQuestionHandler,
  submitAnswerHandler,
  requestHintHandler,
  getResultHandler,
} from '@/api/v1/external/quiz/controller';

const router = Router();

/**
 * @summary
 * External (public) API routes for V1
 *
 * @description
 * Public endpoints that don't require authentication
 */

/**
 * @route Quiz endpoints
 * @description Quiz session management and gameplay
 */
router.post('/quiz', createHandler);
router.get('/quiz/:id_sessao/question', getQuestionHandler);
router.post('/quiz/:id_sessao/answer', submitAnswerHandler);
router.post('/quiz/:id_sessao/hint', requestHintHandler);
router.get('/quiz/:id_sessao/result', getResultHandler);

export default router;
