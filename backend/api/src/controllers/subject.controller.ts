import { Request, Response, NextFunction } from 'express';
import * as subjectService from '../services/subject.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.createSubject(req.body);
    sendResponse(res, 201, 'Subject created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.getSubject(req.params.id as string);
    sendResponse(res, 200, 'Subject retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.updateSubject(req.params.id as string, req.body);
    sendResponse(res, 200, 'Subject updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.deleteSubject(req.params.id as string);
    sendResponse(res, 200, 'Subject deleted', result);
};
