import { Request, Response, NextFunction } from 'express';
import * as departmentService from '../services/department.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body, institutionId: req.user!.institutionId };
    const result = await departmentService.createDepartment(data);
    sendResponse(res, 201, 'Department created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await departmentService.getDepartment(req.params.id as string);
    sendResponse(res, 200, 'Department retrieved', result);
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const result = await departmentService.getDepartments(req.user!.institutionId!);
    sendResponse(res, 200, 'Departments retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await departmentService.updateDepartment(req.params.id as string, req.body);
    sendResponse(res, 200, 'Department updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await departmentService.deleteDepartment(req.params.id as string);
    sendResponse(res, 200, 'Department deleted', result);
};
