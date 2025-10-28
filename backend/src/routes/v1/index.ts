import { Router } from 'express';
import externalRoutes from '@/routes/v1/externalRoutes';
import internalRoutes from '@/routes/v1/internalRoutes';

const router = Router();

/**
 * @summary
 * V1 API router
 *
 * @description
 * Organizes routes into external (public) and internal (authenticated) sections
 */

/**
 * @api External (public) routes
 * @route /external
 * @description Public endpoints accessible without authentication
 */
router.use('/external', externalRoutes);

/**
 * @api Internal (authenticated) routes
 * @route /internal
 * @description Protected endpoints requiring authentication
 */
router.use('/internal', internalRoutes);

export default router;
