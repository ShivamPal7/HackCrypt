import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';
import env from '../config/env';
import prisma from '../config/prisma';
import { Role } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: Role;
                email: string;
            };
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new ApiError(401, 'Authentication required');
        }

        const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: Role; email: string };
        req.user = decoded;

        // Optional: Check if user still exists in DB if strict security needed
        // const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        // if (!user) throw new ApiError(401, 'User not found');

        next();
    } catch (error) {
        next(new ApiError(401, 'Invalid or expired token'));
    }
};

export const authorize = (allowedRoles: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ApiError(401, 'Authentication required'));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(new ApiError(403, 'Access denied'));
        }

        next();
    };
};
