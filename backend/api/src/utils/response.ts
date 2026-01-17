import { Response } from 'express';

interface ApiResponse {
    success: boolean;
    message: string;
    data?: any;
    errors?: any;
}

export const sendResponse = (res: Response, statusCode: number, message: string, data?: any) => {
    const response: ApiResponse = {
        success: true,
        message,
        data,
    };
    res.status(statusCode).json(response);
};

export const sendError = (res: Response, statusCode: number, message: string, errors?: any) => {
    const response: ApiResponse = {
        success: false,
        message,
        errors,
    };
    res.status(statusCode).json(response);
};
