import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from '@/config';
import { errorMiddleware } from '@/middleware/error';
import { notFoundMiddleware } from '@/middleware/notFound';
import apiRoutes from '@/routes';

const app: Application = express();

/**
 * @summary
 * Security middleware configuration
 *
 * @description
 * Applies security headers and CORS policies to protect the API
 */
app.use(helmet());
app.use(cors(config.api.cors));

/**
 * @summary
 * Request processing middleware
 *
 * @description
 * Configures JSON parsing, URL encoding, and response compression
 */
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * @api {get} /health Health Check
 * @apiName HealthCheck
 * @apiGroup System
 * @apiVersion 1.0.0
 *
 * @apiDescription Returns server health status
 *
 * @apiSuccess {String} status Server status
 * @apiSuccess {String} timestamp Current timestamp
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.api.version,
  });
});

/**
 * @summary
 * API Routes with versioning
 *
 * @description
 * Mounts all API routes under /api prefix with version support
 * Creates routes like:
 * - /api/v1/external/...
 * - /api/v1/internal/...
 */
app.use('/api', apiRoutes);

/**
 * @summary
 * 404 handler for undefined routes
 */
app.use(notFoundMiddleware);

/**
 * @summary
 * Global error handling middleware
 */
app.use(errorMiddleware);

/**
 * @summary
 * Graceful shutdown handler
 *
 * @description
 * Handles SIGTERM signal for graceful server shutdown
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

/**
 * @summary
 * Server startup
 *
 * @description
 * Starts the Express server on configured port
 */
const server = app.listen(config.api.port, () => {
  console.log(`Server running on port ${config.api.port} in ${process.env.NODE_ENV} mode`);
  console.log(`API Version: ${config.api.version}`);
  console.log(`Health check: http://localhost:${config.api.port}/health`);
});

export default server;
