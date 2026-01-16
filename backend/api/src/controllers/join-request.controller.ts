import { Request, Response, NextFunction } from 'express';
import * as joinRequestService from '../services/join-request.service';
import { sendResponse } from '../utils/response';
import ApiError from '../utils/ApiError';
import { JoinRequestStatus } from '@prisma/client';

export const listRequests = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.institutionId) {
        throw new ApiError(400, 'User not linked to an institution');
    }
    const result = await joinRequestService.listRequests(
        req.user.institutionId,
        req.user.role,
        req.user.id
    );
    sendResponse(res, 200, 'Pending join requests fetched', result);
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.institutionId) {
        throw new ApiError(400, 'User not linked to an institution');
    }

    const { status } = req.body;
    if (!Object.values(JoinRequestStatus).includes(status)) {
        throw new ApiError(400, 'Invalid status');
    }

    const result = await joinRequestService.updateStatus(
        req.params.id as string,
        status as JoinRequestStatus,
        req.user.id,
        req.user.role,
        req.user.institutionId
    );
    sendResponse(res, 200, 'Request status updated', result);
};
