import type { NextFunction, Request, Response } from 'express';
import { type ZodType } from 'zod';
import { ZodError } from 'zod';
import { ValidationError } from '../errors';

export const validateRequest = (schema: ZodType) => async (req: Request, _res: Response, next: NextFunction) => {
    try {
        await schema.parse({ body: req.body, query: req.query, params: req.params });
        next();
    } catch (err) {
        if (err instanceof ZodError) {
            throw new ValidationError(
                err.issues.map((e) => ({
                    path: e.path.length > 0 ? e.path.join('.') : 'root',
                    message: e.message,
                }))
            );
        }
        throw err;
    }
};
