import { Request, Response, NextFunction } from 'express';
import * as classService from '../services/class.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await classService.createClass(req.body);
    sendResponse(res, 201, 'Class created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await classService.getClass(req.params.id as string);
    sendResponse(res, 200, 'Class retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await classService.updateClass(req.params.id as string, req.body);
    sendResponse(res, 200, 'Class updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await classService.deleteClass(req.params.id as string);
    sendResponse(res, 200, 'Class deleted', result);
};
