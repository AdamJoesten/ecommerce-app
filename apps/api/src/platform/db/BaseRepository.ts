import { DatabaseError } from 'pg';
import { type DrizzleClient } from '.';
import { BadRequestError, ConflictError } from '../infrastructure/http/errors';

export abstract class BaseRepository {
    protected readonly _db: DrizzleClient;

    constructor(client: DrizzleClient) {
        this._db = client
    }

    protected handleError(error: unknown): never {
        if (error instanceof DatabaseError) {
            switch (error.code) {
                case '23505':
                    throw new ConflictError(`Unique constraint violation: ${error.detail}`);
                case '23503':
                    throw new BadRequestError(`Foreign key constraint violation: ${error.detail}`);
                case '23502':
                    throw new BadRequestError(`Not null constraint violation: ${error.detail}`);
            }
        }
        throw error;
    }
}
