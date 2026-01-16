import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';
import { SessionStatus } from '@prisma/client';

export const createLecture = async (data: any, institutionId: string) => {
    // Verify Class and Subject belong to Institution
    const classData = await prisma.class.findUnique({ where: { id: data.classId } });
    if (!classData || classData.institutionId !== institutionId) throw new ApiError(404, 'Class not found in this institution');

    const subjectData = await prisma.subject.findUnique({ where: { id: data.subjectId } });
    if (!subjectData || subjectData.institutionId !== institutionId) throw new ApiError(404, 'Subject not found in this institution');

    // Verify Teacher belongs to Institution (and ideally is assigned to department? But Admin can override)
    const teacher = await prisma.user.findUnique({ where: { id: data.teacherId } });
    if (!teacher || teacher.institutionId !== institutionId) throw new ApiError(404, 'Teacher not found in this institution');

    const lecture = await prisma.lecture.create({
        data: { ...data, institutionId },
    });
    return lecture;
};

export const getLectures = async (query: any, institutionId: string, user: any) => {
    const { classId, teacherId, fromDate, toDate } = query;
    const where: any = { institutionId };

    if (classId) where.classId = classId;
    if (teacherId) where.teacherId = teacherId;

    // RBAC: Student can only see lectures of their class
    if (user.role === 'STUDENT') {
        if (!user.studentClassId) throw new ApiError(403, 'Student not assigned to any class');
        where.classId = user.studentClassId;
    }
    // RBAC: Teacher can see lectures they teach (or all? Usually their own or schedule table)
    // Let's allow Teachers to see all for now to check potential subs, or restrict?
    // User View Rule: "Teacher View... All lectures they have taught". 
    // Allowing filter.

    if (fromDate && toDate) {
        where.startTime = { gte: new Date(fromDate), lte: new Date(toDate) };
    }

    const lectures = await prisma.lecture.findMany({
        where,
        include: { subject: true, class: true, teacher: { select: { name: true, id: true } } },
        orderBy: { startTime: 'asc' }
    });
    return lectures;
};

export const getLecture = async (id: string, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({
        where: { id },
        include: { subject: true, class: true, teacher: { select: { name: true, id: true } }, attendances: true }
    });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');
    return lecture;
};

export const updateLecture = async (id: string, data: any, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');

    const updated = await prisma.lecture.update({
        where: { id },
        data,
    });
    return updated;
};

export const deleteLecture = async (id: string, institutionId: string) => {
    const lecture = await prisma.lecture.findUnique({ where: { id } });
    if (!lecture || lecture.institutionId !== institutionId) throw new ApiError(404, 'Lecture not found');

    await prisma.lecture.delete({ where: { id } });
    return { message: 'Lecture deleted' };
};
