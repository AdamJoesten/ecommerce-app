import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { ApiResponse } from '@ecommerce/contracts';
import { createApiResponse } from '../../../../api/v1/api-docs/openAPIResponseBuilder';
import { db } from '../../../db';

export const healthRegistry = new OpenAPIRegistry();
export const healthRouter: Router = Router();

const readinessSchema = z.object({
    db: z.enum(['ok', 'unreachable']),
});

healthRegistry.registerPath({
    method: 'get',
    path: '/health/live',
    tags: ['Health'],
    description: 'Always 200 while the process is alive. Used by the orchestrator to decide whether to restart the container — it does not check dependencies.',
    responses: createApiResponse(z.null(), 'Process is alive'),
});

// Liveness: "is the process alive" — no dependency checks. An orchestrator
// restarts the container when this fails, so it must never fail just
// because Postgres is slow; that would cause a restart loop that can't fix
// a downstream outage.
healthRouter.get('/live', (_req: Request, res: Response) => {
    const response = ApiResponse.success('Process is alive', null);
    res.status(response.statusCode).json(response);
});

healthRegistry.registerPath({
    method: 'get',
    path: '/health/ready',
    tags: ['Health'],
    description: '200 only when downstream dependencies are reachable. Used to gate traffic — an orchestrator stops routing to an instance that fails this, without restarting it.',
    responses: {
        ...createApiResponse(readinessSchema, 'Ready to accept traffic'),
        ...createApiResponse(readinessSchema, 'A dependency is unreachable', StatusCodes.SERVICE_UNAVAILABLE),
    },
});

// Readiness: "can this instance serve a request right now" — checks the one
// dependency we actually have. A timeout guards against a hung TCP
// connection stalling the health check itself (and, transitively, the
// orchestrator's polling loop) indefinitely.
const READINESS_TIMEOUT_MS = 2000;

const pingDb = async (): Promise<boolean> => {
    const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('readiness DB check timed out')), READINESS_TIMEOUT_MS),
    );
    try {
        await Promise.race([db.execute(sql`select 1`), timeout]);
        return true;
    } catch {
        return false;
    }
};

healthRouter.get('/ready', async (_req: Request, res: Response) => {
    const dbOk = await pingDb();
    const response = dbOk
        ? ApiResponse.success('Ready to accept traffic', { db: 'ok' as const })
        : ApiResponse.failure('Dependency unreachable', { db: 'unreachable' as const }, StatusCodes.SERVICE_UNAVAILABLE);
    res.status(response.statusCode).json(response);
});
