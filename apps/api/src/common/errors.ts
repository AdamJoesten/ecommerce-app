import { StatusCodes } from 'http-status-codes'

export abstract class ApplicationError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
        options?: ErrorOptions
    ) {
        super(message, options)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends ApplicationError {
    constructor(message = "Resource not found", options?: ErrorOptions) {
        super(message, StatusCodes.NOT_FOUND, options)
    }
}

export class ConflictError extends ApplicationError {
    constructor(message = "", options?: ErrorOptions) {
        super(message, StatusCodes.CONFLICT, options)
    }
}

export class BadRequestError extends ApplicationError {
    constructor(message = "", options?: ErrorOptions) {
        super(message, StatusCodes.BAD_REQUEST, options)
    }
}

export class InternalServerError extends ApplicationError {
    constructor(message = "Internal server error", options?: ErrorOptions) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR, options)
    }
}