import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { sendResponse } from '../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.register(req.body);
    sendResponse(res, 201, 'User registered successfully', result);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.login(req.body);
    sendResponse(res, 200, 'Login successful', result);
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const result = await authService.refreshToken(req.body.refreshToken);
    sendResponse(res, 200, 'Tokens refreshed successfully', result);
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    // req.user is set by auth middleware
    const result = await authService.getMe(req.user!.id);
    sendResponse(res, 200, 'User profile retrieved', result);
};
