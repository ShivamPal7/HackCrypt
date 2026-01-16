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
const express_1 = require("express");
const lectureController = __importStar(require("../controllers/lecture.controller"));
const attendanceController = __importStar(require("../controllers/attendance.controller")); // Import attendance controller
const lectureValidator = __importStar(require("../validators/lecture.validator"));
const validate_middleware_1 = require("../middlewares/validate.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
// Canonical Session Routes (Nested)
// POST /lectures/:id/sessions/start (Teacher) - We map this to createSession, passing lectureId in body? 
// No, spec says POST /lectures/:id/sessions/start.
// We need a wrapper in controller to inject req.params.id into body.lectureId or service method change.
// createSession takes (userId, data). Data needs lectureId.
// Let's use a middleware or just a small inline handler wrapper?
// Or update attendanceController.createSession to look at params if body missing?
// Let's stick to simple: The route handler can simple take params.id and call service.
// Actually, I'll map `POST /:id/sessions/start` to `attendanceController.createSession` BUT I need to ensure `req.body.lectureId` is set.
// I'll add a middleware to copy param to body? Or better, just update the controller.
// `attendanceController.createSession` reads `req.body`.
// Let's modify `attendanceController.createSession` to check `req.params.id` (which is lectureId in this context).
router.post('/:id/sessions/start', (0, auth_middleware_1.authorize)([client_1.Role.TEACHER, client_1.Role.ADMIN]), (req, res, next) => {
    req.body.lectureId = req.params.id;
    next();
}, (0, asyncHandler_1.default)(attendanceController.createSession));
router.post('/:id/sessions/close', (0, auth_middleware_1.authorize)([client_1.Role.TEACHER, client_1.Role.ADMIN]), (0, asyncHandler_1.default)(attendanceController.closeActiveSession));
router.get('/:id/sessions', (0, auth_middleware_1.authorize)([client_1.Role.TEACHER, client_1.Role.ADMIN]), (0, asyncHandler_1.default)(attendanceController.getLectureSessions));
// Lecture Management
router.post('/', (0, auth_middleware_1.authorize)([client_1.Role.ADMIN]), (0, validate_middleware_1.validate)(lectureValidator.createLectureSchema), (0, asyncHandler_1.default)(lectureController.create));
router.get('/', (0, auth_middleware_1.authorize)([client_1.Role.ADMIN, client_1.Role.TEACHER, client_1.Role.STUDENT]), (0, asyncHandler_1.default)(lectureController.getAll));
router.get('/:id', (0, auth_middleware_1.authorize)([client_1.Role.ADMIN, client_1.Role.TEACHER, client_1.Role.STUDENT]), (0, asyncHandler_1.default)(lectureController.get));
router.put('/:id', (0, auth_middleware_1.authorize)([client_1.Role.ADMIN]), (0, validate_middleware_1.validate)(lectureValidator.updateLectureSchema), (0, asyncHandler_1.default)(lectureController.update));
router.delete('/:id', (0, auth_middleware_1.authorize)([client_1.Role.ADMIN]), (0, asyncHandler_1.default)(lectureController.remove));
exports.default = router;
