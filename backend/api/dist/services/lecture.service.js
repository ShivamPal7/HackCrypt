"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLecture = exports.updateLecture = exports.getLecture = exports.getLectures = exports.createLecture = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createLecture = async (data, institutionId) => {
    // Verify Class and Subject belong to Institution
    const classData = await prisma_1.default.class.findUnique({ where: { id: data.classId } });
    if (!classData || classData.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Class not found in this institution');
    const subjectData = await prisma_1.default.subject.findUnique({ where: { id: data.subjectId } });
    if (!subjectData || subjectData.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Subject not found in this institution');
    // Verify Teacher belongs to Institution (and ideally is assigned to department? But Admin can override)
    const teacher = await prisma_1.default.user.findUnique({ where: { id: data.teacherId } });
    if (!teacher || teacher.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Teacher not found in this institution');
    const lecture = await prisma_1.default.lecture.create({
        data: { ...data, institutionId },
    });
    return lecture;
};
exports.createLecture = createLecture;
const getLectures = async (query, institutionId, user) => {
    const { date } = query;
    const where = { institutionId };
    // 1. Role-Based Scoping
    if (user.role === 'STUDENT') {
        if (!user.studentClassId)
            throw new ApiError_1.default(403, 'Student not assigned to any class');
        where.classId = user.studentClassId;
    }
    else if (user.role === 'TEACHER') {
        where.teacherId = user.id;
    }
    // Admin sees all (already scoped by institutionId)
    // 2. Date Filtering
    if (date) {
        // Specific date: 00:00 to 23:59
        const targetDate = new Date(date);
        const nextDay = new Date(targetDate);
        nextDay.setDate(targetDate.getDate() + 1);
        where.startTime = {
            gte: targetDate,
            lt: nextDay
        };
    }
    else {
        // No date? Fetch ALL scheduled lectures?
        // User spec: "If date is NOT provided: Fetch all scheduled lectures"
        // We might want to limit to 'future' or something for sanity, but sticking to spec "ALL".
    }
    // 3. Fetch Data
    const lectures = await prisma_1.default.lecture.findMany({
        where,
        include: {
            subject: { select: { icon: true } },
            // teacher: { select: { name: true } } // Optional, not requested in specs response
        },
        orderBy: { startTime: 'asc' }
    });
    // 4. Transform & Format
    const formattedLectures = lectures.map(l => {
        const start = l.startTime;
        const end = l.endTime;
        const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60)); // minutes
        // Format time HH:mm
        const formatTime = (d) => d.toISOString().substring(11, 16);
        return {
            lectureId: l.id,
            title: l.title || l.topic || "Untitled Lecture", // Fallback
            date: start.toISOString().split('T')[0],
            startTime: formatTime(start),
            endTime: formatTime(end),
            duration,
            roomNumber: l.roomNumber,
            location: l.location,
            icon: l.icon || l.subject.icon, // Fallback
            status: l.status
        };
    });
    // 5. Grouping or Single Date Return
    if (date) {
        return {
            date: date,
            lectures: formattedLectures
        };
    }
    else {
        // Group by date
        const grouped = {};
        formattedLectures.forEach(l => {
            if (!grouped[l.date])
                grouped[l.date] = [];
            grouped[l.date].push(l);
        });
        // Convert to array
        return Object.keys(grouped).sort().map(d => ({
            date: d,
            lectures: grouped[d]
        }));
    }
};
exports.getLectures = getLectures;
const getLecture = async (id, institutionId) => {
    const lecture = await prisma_1.default.lecture.findUnique({
        where: { id },
        include: { subject: true, class: true, teacher: { select: { name: true, id: true } }, attendances: true }
    });
    if (!lecture || lecture.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Lecture not found');
    return lecture;
};
exports.getLecture = getLecture;
const updateLecture = async (id, data, institutionId) => {
    const lecture = await prisma_1.default.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Lecture not found');
    const updated = await prisma_1.default.lecture.update({
        where: { id },
        data,
    });
    return updated;
};
exports.updateLecture = updateLecture;
const deleteLecture = async (id, institutionId) => {
    const lecture = await prisma_1.default.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId)
        throw new ApiError_1.default(404, 'Lecture not found');
    await prisma_1.default.lecture.delete({ where: { id } });
    return { message: 'Lecture deleted' };
};
exports.deleteLecture = deleteLecture;
