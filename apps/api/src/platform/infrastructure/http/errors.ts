import { StatusCodes } from 'http-status-codes';

export class ApplicationError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message = 'Bad request') {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message = 'Not found') {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export class ConflictError extends ApplicationError {
    constructor(message = 'Conflict') {
        super(message, StatusCodes.CONFLICT);
    }
}

export class ValidationError extends ApplicationError {
    constructor(public readonly fieldErrors: { path: string; message: string }[]) {
        const messages = fieldErrors.map((e) => `${e.path}: ${e.message}`);
        const message =
            messages.length === 1
                ? `Invalid input: ${messages[0]}`
                : `Invalid input (${messages.length} errors): ${messages.join('; ')}`;
        super(message, StatusCodes.UNPROCESSABLE_ENTITY);
    }
}
