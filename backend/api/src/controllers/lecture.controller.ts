import { Request, Response, NextFunction } from 'express';
import * as lectureService from '../services/lecture.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await lectureService.createLecture(req.body, req.user!.institutionId!);
    sendResponse(res, 201, 'Lecture created', result);
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await lectureService.getLectures(req.query, req.user!.institutionId!, req.user!);
    sendResponse(res, 200, 'Lectures retrieved', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await lectureService.getLecture(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Lecture retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await lectureService.updateLecture(req.params.id as string, req.body, req.user!.institutionId!);
    sendResponse(res, 200, 'Lecture updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await lectureService.deleteLecture(req.params.id as string, req.user!.institutionId!);
    sendResponse(res, 200, 'Lecture deleted', result);
};
