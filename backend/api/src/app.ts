import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import env from './config/env';
import { errorHandler } from './middlewares/error.middleware';

import authRouter from './routes/auth.routes';
import organisationRouter from './routes/organisation.routes';
import userRouter from './routes/user.routes';
import departmentRouter from './routes/department.routes';
import classRouter from './routes/class.routes';
import subjectRouter from './routes/subject.routes';
import deviceRouter from './routes/device.routes';
import attendanceRouter from './routes/attendance.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
    res.send({ message: 'Attendance API is running' });
});

app.use('/auth', authRouter);
app.use('/organisations', organisationRouter);
app.use('/users', userRouter);
app.use('/departments', departmentRouter);
app.use('/classes', classRouter);
app.use('/subjects', subjectRouter);
app.use('/devices', deviceRouter);
app.use('/', attendanceRouter); // Mount at root for /sessions, /attendance

// Error Handler
app.use(errorHandler);

export default app;
