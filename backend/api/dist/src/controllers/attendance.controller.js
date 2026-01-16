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
exports.override = exports.mark = exports.getSession = exports.endSession = exports.startSession = exports.createSession = void 0;
const attendanceService = __importStar(require("../services/attendance.service"));
const response_1 = require("../utils/response");
const createSession = async (req, res, next) => {
    const result = await attendanceService.createSession(req.body);
    (0, response_1.sendResponse)(res, 201, 'Session created', result);
};
exports.createSession = createSession;
const startSession = async (req, res, next) => {
    const result = await attendanceService.startSession(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Session started', result);
};
exports.startSession = startSession;
const endSession = async (req, res, next) => {
    const result = await attendanceService.endSession(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Session ended', result);
};
exports.endSession = endSession;
const getSession = async (req, res, next) => {
    const result = await attendanceService.getSession(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Session retrieved', result);
};
exports.getSession = getSession;
const mark = async (req, res, next) => {
    const result = await attendanceService.markAttendance(req.user.id, req.body);
    (0, response_1.sendResponse)(res, 200, 'Attendance marked successfully', result);
};
exports.mark = mark;
const override = async (req, res, next) => {
    const result = await attendanceService.overrideAttendance(req.params.id, req.user.id, req.body);
    (0, response_1.sendResponse)(res, 200, 'Attendance overridden', result);
};
exports.override = override;
