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
const organisation_routes_1 = __importDefault(require("./routes/organisation.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const class_routes_1 = __importDefault(require("./routes/class.routes"));
const subject_routes_1 = __importDefault(require("./routes/subject.routes"));
const device_routes_1 = __importDefault(require("./routes/device.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
// Routes
app.get('/', (req, res) => {
    res.send({ message: 'Attendance API is running' });
});
app.use('/auth', auth_routes_1.default);
app.use('/organisations', organisation_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/departments', department_routes_1.default);
app.use('/classes', class_routes_1.default);
app.use('/subjects', subject_routes_1.default);
app.use('/devices', device_routes_1.default);
app.use('/', attendance_routes_1.default); // Mount at root for /sessions, /attendance
// Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
