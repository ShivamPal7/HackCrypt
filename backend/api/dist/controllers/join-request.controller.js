"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.listRequests = void 0;
const joinRequestService = __importStar(require("../services/join-request.service"));
const response_1 = require("../utils/response");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const client_1 = require("@prisma/client");
const listRequests = async (req, res, next) => {
    if (!req.user?.institutionId) {
        throw new ApiError_1.default(400, 'User not linked to an institution');
    }
    const result = await joinRequestService.listRequests(req.user.institutionId, req.user.role, req.user.id);
    (0, response_1.sendResponse)(res, 200, 'Pending join requests fetched', result);
};
exports.listRequests = listRequests;
const updateStatus = async (req, res, next) => {
    if (!req.user?.institutionId) {
        throw new ApiError_1.default(400, 'User not linked to an institution');
    }
    const { status } = req.body;
    if (!Object.values(client_1.JoinRequestStatus).includes(status)) {
        throw new ApiError_1.default(400, 'Invalid status');
    }
    const result = await joinRequestService.updateStatus(req.params.id, status, req.user.id, req.user.role, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Request status updated', result);
};
exports.updateStatus = updateStatus;
