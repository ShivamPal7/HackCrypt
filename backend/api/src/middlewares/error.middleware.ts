import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import { sendError } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || undefined;

    if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.errors;
    }

    sendError(res, statusCode, message, errors);
};
