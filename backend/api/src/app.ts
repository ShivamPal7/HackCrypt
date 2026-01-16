import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import institutionRoutes from './routes/institution.routes';
import joinRequestRoutes from './routes/join-request.routes';
import userRoutes from './routes/user.routes';
import departmentRoutes from './routes/department.routes';
import classRoutes from './routes/class.routes';
import subjectRoutes from './routes/subject.routes';
import deviceRoutes from './routes/device.routes';
import attendanceRoutes from './routes/attendance.routes';
import lectureRoutes from './routes/lecture.routes';
import reportRoutes from './routes/report.routes';
import auditRoutes from './routes/audit.routes';
import metaRoutes from './routes/meta.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/join-requests', joinRequestRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/lectures', lectureRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/meta', metaRoutes);

// Error Handling
app.use(errorHandler);

export default app;
