import { Router } from 'express';
import v1Routes from '@/routes/v1';

const router = Router();

/**
 * @summary
 * Main API router with version management
 *
 * @description
 * Routes all API requests to appropriate version handlers
 * Supports multiple API versions for backward compatibility
 */

/**
 * @api Version 1 (current stable)
 * @route /v1
 */
router.use('/v1', v1Routes);

/**
 * @api Future versions can be added here
 * @example
 * router.use('/v2', v2Routes);
 */

export default router;
