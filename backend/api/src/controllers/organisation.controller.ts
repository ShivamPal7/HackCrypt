import { Request, Response, NextFunction } from 'express';
import * as organisationService from '../services/organisation.service';
import { sendResponse } from '../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const result = await organisationService.createOrganisation(req.body, req.user!.id);
    sendResponse(res, 201, 'Organisation created successfully', result);
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
    const result = await organisationService.getOrganisation(req.params.id as string);
    sendResponse(res, 200, 'Organisation retrieved', result);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const result = await organisationService.updateOrganisation(req.params.id as string, req.body);
    sendResponse(res, 200, 'Organisation updated', result);
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const result = await organisationService.deleteOrganisation(req.params.id as string);
    sendResponse(res, 200, 'Organisation deleted', result);
};
