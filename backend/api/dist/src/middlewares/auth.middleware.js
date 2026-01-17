"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const env_1 = __importDefault(require("../config/env"));
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError_1.default(401, 'Authentication required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.default.JWT_SECRET);
        req.user = decoded;
        // Optional: Check if user still exists in DB if strict security needed
        // const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        // if (!user) throw new ApiError(401, 'User not found');
        next();
    }
    catch (error) {
        next(new ApiError_1.default(401, 'Invalid or expired token'));
    }
};
exports.authenticate = authenticate;
const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new ApiError_1.default(401, 'Authentication required'));
        }
        if (!allowedRoles.includes(req.user.role)) {
            return next(new ApiError_1.default(403, 'Access denied'));
        }
        next();
    };
};
exports.authorize = authorize;
