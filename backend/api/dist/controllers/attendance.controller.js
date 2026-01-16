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
exports.getOverride = exports.getLectureAttendance = exports.getMyAttendance = exports.getLectureSessions = exports.closeActiveSession = exports.override = exports.mark = exports.getSession = exports.endSession = exports.createSession = void 0;
const attendanceService = __importStar(require("../services/attendance.service"));
const response_1 = require("../utils/response");
const createSession = async (req, res, next) => {
    const result = await attendanceService.createSession(req.user.id, req.body);
    (0, response_1.sendResponse)(res, 201, 'Session created', result);
};
exports.createSession = createSession;
// Start session is essentially createSession or we can have a specific start if schedule exists.
// For now mapping start -> create if not exists? Or deprecating startSession route?
// User: "Attendance Session... Can be opened and closed independently".
// Let's assume createSession OPENS it.
const endSession = async (req, res, next) => {
    const result = await attendanceService.endSession(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Session ended', result);
};
exports.endSession = endSession;
const getSession = async (req, res, next) => {
    const result = await attendanceService.getSession(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Session details', result);
};
exports.getSession = getSession;
const mark = async (req, res, next) => {
    // req.body now contains lectureId etc.
    const result = await attendanceService.markAttendance(req.user.id, req.body, req.user.institutionId);
    (0, response_1.sendResponse)(res, 201, 'Attendance marked successfully', result);
};
exports.mark = mark;
// ... existing methods ...
const override = async (req, res, next) => {
    const result = await attendanceService.overrideAttendance(req.params.id, req.user.id, req.body);
    (0, response_1.sendResponse)(res, 200, 'Attendance overridden', result);
};
exports.override = override;
const closeActiveSession = async (req, res, next) => {
    const result = await attendanceService.closeActiveSession(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Session closed', result);
};
exports.closeActiveSession = closeActiveSession;
const getLectureSessions = async (req, res, next) => {
    const result = await attendanceService.getLectureSessions(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Sessions retrieved', result);
};
exports.getLectureSessions = getLectureSessions;
const getMyAttendance = async (req, res, next) => {
    const result = await attendanceService.getStudentAttendance(req.user.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'My attendance retrieved', result);
};
exports.getMyAttendance = getMyAttendance;
const getLectureAttendance = async (req, res, next) => {
    const result = await attendanceService.getLectureAttendance(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Lecture attendance retrieved', result);
};
exports.getLectureAttendance = getLectureAttendance;
const getOverride = async (req, res, next) => {
    const result = await attendanceService.getAttendanceOverride(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Override details', result);
};
exports.getOverride = getOverride;
