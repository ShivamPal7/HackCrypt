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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getMe = exports.rejectJoinRequest = exports.approveJoinRequest = exports.getJoinRequests = exports.joinRequest = exports.create = void 0;
const institutionService = __importStar(require("../services/institution.service"));
const response_1 = require("../utils/response");
const create = async (req, res, next) => {
    const result = await institutionService.createInstitution(req.body);
    (0, response_1.sendResponse)(res, 201, 'Institution and Admin created successfully', result);
};
exports.create = create;
const joinRequest = async (req, res, next) => {
    const result = await institutionService.joinInstitution(req.user.id, req.body.joinCode);
    (0, response_1.sendResponse)(res, 200, 'Join request sent', result);
};
exports.joinRequest = joinRequest;
const getJoinRequests = async (req, res, next) => {
    const result = await institutionService.getJoinRequests(req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Join requests retrieved', result);
};
exports.getJoinRequests = getJoinRequests;
const approveJoinRequest = async (req, res, next) => {
    // Ensure the request belongs to the admin's institution is enforced implicitly if we filter by it, 
    // but the service needs to know.
    // Ideally we verify that the request target institution matches the admin's institution.
    // For now passing adminId isn't enough, we pass requestId. Service handles update. 
    // TODO: Add strict ownership check in service or here.
    // Strict check:
    const result = await institutionService.approveJoinRequest(req.user.id, req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Request approved', result);
};
exports.approveJoinRequest = approveJoinRequest;
const rejectJoinRequest = async (req, res, next) => {
    const result = await institutionService.rejectJoinRequest(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Request rejected', result);
};
exports.rejectJoinRequest = rejectJoinRequest;
const getMe = async (req, res, next) => {
    const result = await institutionService.getInstitution(req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Institution retrieved', result);
};
exports.getMe = getMe;
const update = async (req, res, next) => {
    const result = await institutionService.updateInstitution(req.user.institutionId, req.body);
    (0, response_1.sendResponse)(res, 200, 'Institution updated', result);
};
exports.update = update;
const remove = async (req, res, next) => {
    const result = await institutionService.deleteInstitution(req.user.institutionId, req.user.id);
    (0, response_1.sendResponse)(res, 200, 'Institution deleted', result);
};
exports.remove = remove;
