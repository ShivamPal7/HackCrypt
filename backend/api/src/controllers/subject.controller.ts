import { Request, Response, NextFunction } from 'express';
import * as subjectService from '../services/subject.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, institutionId: req.user!.institutionId };
    const result = await subjectService.createSubject(data);
    sendResponse(res, 201, 'Subject created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.getSubject(req.params.id as string);
    sendResponse(res, 200, 'Subject retrieved', result);
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const filters = {
        classId: req.query.classId as string,
        departmentId: req.query.departmentId as string
    };
    const result = await subjectService.getSubjects(req.user!.institutionId!, filters);
    sendResponse(res, 200, 'Subjects retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.updateSubject(req.params.id as string, req.body);
    sendResponse(res, 200, 'Subject updated', result);
};

export const assignToClass = async (req: Request, res: Response, next: NextFunction) => {
    const { classId } = req.body;
    const subjectId: string = req.params.id as string;
    const cid: string = String(classId);
    const institutionId: string = req.user!.institutionId!;

    // @ts-ignore - TS thinks this is string[]? Logic ensures string.
    const result = await subjectService.assignSubjectToClass(subjectId, cid, institutionId);
    sendResponse(res, 200, 'Subject assigned to class', result);
};

export const assignToDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const { departmentId } = req.body;
    const subjectId: string = req.params.id as string;
    const did: string = String(departmentId);
    const institutionId: string = req.user!.institutionId!;

    // @ts-ignore - TS thinks this is string[]? Logic ensures string.
    const result = await subjectService.assignSubjectToDepartment(subjectId, did, institutionId);
    sendResponse(res, 200, 'Subject assigned to department', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await subjectService.deleteSubject(req.params.id as string);
    sendResponse(res, 200, 'Subject deleted', result);
};
