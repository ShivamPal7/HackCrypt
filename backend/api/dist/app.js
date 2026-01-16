"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const institution_routes_1 = __importDefault(require("./routes/institution.routes"));
const join_request_routes_1 = __importDefault(require("./routes/join-request.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const class_routes_1 = __importDefault(require("./routes/class.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const device_routes_1 = __importDefault(require("./routes/device.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const lecture_routes_1 = __importDefault(require("./routes/lecture.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const audit_routes_1 = __importDefault(require("./routes/audit.routes"));
const meta_routes_1 = __importDefault(require("./routes/meta.routes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/institutions', institution_routes_1.default);
app.use('/api/join-requests', join_request_routes_1.default);
app.use('/api/users', user_routes_1.default);
app.use('/api/departments', department_routes_1.default);
app.use('/api/classes', class_routes_1.default);
app.use('/api/subjects', subject_routes_1.default);
app.use('/api/devices', device_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/lectures', lecture_routes_1.default);
app.use('/api/reports', report_routes_1.default);
app.use('/api/audit', audit_routes_1.default);
app.use('/api/meta', meta_routes_1.default);
// Error Handling
app.use(error_middleware_1.errorHandler);
exports.default = app;
