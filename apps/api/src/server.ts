import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@ecommerce/contracts';
import { v1Router } from './api/v1/v1Router';
import { ApplicationError, ValidationError } from './common/errors';

const app: Express = express();

app.use('/api/v1', v1Router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ValidationError) {
        res.status(err.statusCode).json(ApiResponse.failure(err.message, err.fieldErrors, err.statusCode));
    } else if (err instanceof ApplicationError) {
        res.status(err.statusCode).json(ApiResponse.failure(err.message, null, err.statusCode));
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            ApiResponse.failure('Internal server error', null, StatusCodes.INTERNAL_SERVER_ERROR)
        );
    }
});

export { app };
