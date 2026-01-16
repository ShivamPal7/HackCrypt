import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body);
    sendResponse(res, 201, 'User created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getUser(req.params.id as string);
    sendResponse(res, 200, 'User retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.updateUser(req.params.id as string, req.body);
    sendResponse(res, 200, 'User updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.deleteUser(req.params.id as string);
    sendResponse(res, 200, 'User deleted', result);
};
