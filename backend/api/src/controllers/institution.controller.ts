import { Request, Response, NextFunction } from 'express';
import * as institutionService from '../services/institution.service';
import { sendResponse } from '../utils/response';
import ApiError from '../utils/ApiError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.createInstitution(req.body);
    sendResponse(res, 201, 'Institution and Admin created successfully', result);
};

export const joinRequest = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.joinInstitution(req.user!.id, req.body.joinCode);
    sendResponse(res, 200, 'Join request sent', result);
};

export const getJoinRequests = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.getJoinRequests(req.user!.institutionId as string);
    sendResponse(res, 200, 'Join requests retrieved', result);
};

export const approveJoinRequest = async (req: Request, res: Response, next: NextFunction) => {
    // Ensure the request belongs to the admin's institution is enforced implicitly if we filter by it, 
    // but the service needs to know.
    // Ideally we verify that the request target institution matches the admin's institution.
    // For now passing adminId isn't enough, we pass requestId. Service handles update. 
    // TODO: Add strict ownership check in service or here.

    // Strict check:
    const result = await institutionService.approveJoinRequest(req.user!.id, req.params.id as string);
    sendResponse(res, 200, 'Request approved', result);
};

export const rejectJoinRequest = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.rejectJoinRequest(req.params.id as string);
    sendResponse(res, 200, 'Request rejected', result);
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.getInstitution(req.user!.institutionId as string);
    sendResponse(res, 200, 'Institution retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.updateInstitution(req.user!.institutionId as string, req.body);
    sendResponse(res, 200, 'Institution updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await institutionService.deleteInstitution(req.user!.institutionId as string, req.user!.id);
    sendResponse(res, 200, 'Institution deleted', result);
};

