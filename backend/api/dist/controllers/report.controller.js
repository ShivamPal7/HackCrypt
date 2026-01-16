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
exports.getSubjectReport = exports.getStudentLectureHistory = exports.getStudentAttendanceHeatmap = exports.getStudentSubjectDetails = exports.getStudentSubjectSummaries = exports.getStudentSummary = exports.getStudentReport = exports.getClassReport = void 0;
const reportService = __importStar(require("../services/report.service"));
const response_1 = require("../utils/response");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const getClassReport = async (req, res, next) => {
    const result = await reportService.getClassAttendanceReport(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Class report', result);
};
exports.getClassReport = getClassReport;
const getStudentReport = async (req, res, next) => {
    const result = await reportService.getStudentAttendanceReport(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Student report', result);
};
exports.getStudentReport = getStudentReport;
const getStudentSummary = async (req, res, next) => {
    const studentId = req.params.id;
    // RBAC Check: Only Admin or the Student themselves
    if (req.user.role !== 'ADMIN' && req.user.id !== studentId) {
        throw new ApiError_1.default(403, 'Access denied: You can only view your own summary');
    }
    const result = await reportService.getStudentAttendanceSummary(studentId, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Student attendance summary', result);
};
exports.getStudentSummary = getStudentSummary;
const getStudentSubjectSummaries = async (req, res, next) => {
    const studentId = req.params.id;
    const search = req.query.search;
    // RBAC Check
    if (req.user.role !== 'ADMIN' && req.user.id !== studentId) {
        throw new ApiError_1.default(403, 'Access denied: You can only view your own subjects');
    }
    const result = await reportService.getStudentSubjectSummaries(studentId, req.user.institutionId, { search });
    (0, response_1.sendResponse)(res, 200, 'Student subject summaries', result);
};
exports.getStudentSubjectSummaries = getStudentSubjectSummaries;
const getStudentSubjectDetails = async (req, res, next) => {
    const studentId = req.params.studentId;
    const subjectId = req.params.subjectId;
    // RBAC Check
    if (req.user.role !== 'ADMIN' && req.user.id !== studentId) {
        throw new ApiError_1.default(403, 'Access denied: You can only view your own metrics');
    }
    const result = await reportService.getStudentSubjectDetails(studentId, subjectId, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Subject attendance details', result);
};
exports.getStudentSubjectDetails = getStudentSubjectDetails;
const getStudentAttendanceHeatmap = async (req, res, next) => {
    const studentId = req.params.id;
    // RBAC Check
    if (req.user.role !== 'ADMIN' && req.user.id !== studentId) {
        throw new ApiError_1.default(403, 'Access denied: You can only view your own heatmap');
    }
    const result = await reportService.getStudentAttendanceHeatmap(studentId, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Attendance heatmap', result);
};
exports.getStudentAttendanceHeatmap = getStudentAttendanceHeatmap;
const getStudentLectureHistory = async (req, res, next) => {
    const studentId = req.params.id;
    const { search, status } = req.query;
    // RBAC Check
    if (req.user.role !== 'ADMIN' && req.user.id !== studentId) {
        throw new ApiError_1.default(403, 'Access denied: You can only view your own history');
    }
    const result = await reportService.getStudentLectureHistory(studentId, req.user.institutionId, { search: search, status: status });
    (0, response_1.sendResponse)(res, 200, 'Lecture attendance history', result);
};
exports.getStudentLectureHistory = getStudentLectureHistory;
const getSubjectReport = async (req, res, next) => {
    const result = await reportService.getSubjectAttendanceReport(req.params.id, req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Subject report', result);
};
exports.getSubjectReport = getSubjectReport;
