import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.createUser(req.body, req.user!.institutionId!);
    sendResponse(res, 201, 'User created successfully', result);
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getAllUsers(req.user!.institutionId!);
    sendResponse(res, 200, 'Users retrieved', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getUser(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'User retrieved', result);
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getUser(req.user!.id, req.user!.institutionId!);
    sendResponse(res, 200, 'Profile retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.updateUser(req.params.id as string, req.body, req.user!.institutionId!);
    sendResponse(res, 200, 'User updated', result);
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.updateStatus(req.params.id as string, req.body.isActive, req.user!.institutionId!);
    sendResponse(res, 200, 'User status updated', result);
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.updateProfile(req.user!.id, req.body);
    sendResponse(res, 200, 'Profile updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.deleteUser(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'User deleted', result);
};

