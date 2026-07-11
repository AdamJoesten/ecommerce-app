import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { ApiResponse } from '@ecommerce/contracts';
import { createApiResponse } from '../api-docs/openAPIResponseBuilder';


export const healthRegistry = new OpenAPIRegistry();
export const healthRouter: Router = Router();

healthRegistry.registerPath({
    method: 'get',
    path: '/health',
    tags: ['Health'],
    responses: createApiResponse(z.null(), 'Success'),
});

healthRouter.get('/', (_req: Request, res: Response) => {
    const response = ApiResponse.success('Service is healthy', null);
    res.status(response.statusCode).json(response);
});
