import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import ApiError from '../utils/ApiError';

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // Pass ZodError to global error handler
            throw error;
        }
        next(error);
    }
};
