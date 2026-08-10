import { type ZodType, ZodError } from 'zod';
import { ValidationError } from './errors';

export const parse = <T>(schema: ZodType<T>, input: unknown): T => {
    try {
        return schema.parse(input);
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
