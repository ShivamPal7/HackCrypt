"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const env_1 = __importDefault(require("../config/env"));
const prisma_1 = __importDefault(require("../config/prisma"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError_1.default(401, 'Authentication required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        // Fetch fresh user data to get institutionId
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, role: true, email: true, institutionId: true } // Fetch institutionId
        });
        if (!user) {
            throw new ApiError_1.default(401, 'User not found');
        }
        // Global Safety Net: User MUST belong to an institution to access protected routes
        // This handles cases where a user is unlinked/fired but still holds a token
        if (!user.institutionId) {
            throw new ApiError_1.default(403, 'Access denied: User not linked to any institution');
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(new ApiError_1.default(401, 'Invalid or expired token'));
    }
};
exports.authenticate = authenticate;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError_1.default(401, 'User not authenticated'));
        }
        if (!roles.includes(req.user.role)) {
            return next(new ApiError_1.default(403, 'Access denied'));
        }
        next();
    };
};
exports.authorize = authorize;
