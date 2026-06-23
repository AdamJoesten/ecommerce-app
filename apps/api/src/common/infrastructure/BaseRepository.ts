import { DatabaseError } from "pg";
import { BadRequestError, ConflictError, NotFoundError } from "../errors";

export abstract class BaseRepository {
    protected handleError(error: unknown): never {
        if (error instanceof DatabaseError) {
            switch (error.code) {
                case '23505':
                    throw new ConflictError(undefined, { cause: error });
                case '23503':
                    throw new NotFoundError(undefined, { cause: error });
                case '23502':
                    throw new BadRequestError(undefined, { cause: error });
            }
        }
        throw error
    }
}