import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

// Mock the module by its path relative to this file
// Resolves to '../src/config/prisma'
jest.mock('../src/config/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

import prisma from '../src/config/prisma';
import { createLecture } from '../src/services/lecture.service';
import ApiError from '../src/utils/ApiError';

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe('Lecture Service - createLecture', () => {
    const institutionId = 'inst-123';
    const adminUser = { id: 'admin-1', role: 'ADMIN', institutionId };
    const teacherUser = { id: 'teacher-1', role: 'TEACHER', institutionId };
    const otherTeacherUser = { id: 'teacher-2', role: 'TEACHER', institutionId }; // Corrected role

    const validData = {
        classId: 'class-1',
        subjectId: 'subject-1',
        teacherId: 'teacher-1',
        startTime: new Date(),
        endTime: new Date(),
    };

    const mockClass = {
        id: 'class-1',
        institutionId,
        teacherId: 'teacher-1', // Class Teacher
        department: { teachers: [] }
    };

    const mockSubject = {
        id: 'subject-1',
        institutionId,
        classes: [{ id: 'class-1' }] // Linked
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should allow ADMIN to create lecture for any teacher', async () => {
        prismaMock.class.findUnique.mockResolvedValue(mockClass as any);
        prismaMock.subject.findUnique.mockResolvedValue(mockSubject as any);
        prismaMock.user.findUnique.mockResolvedValue({ id: 'teacher-1', institutionId } as any);
        prismaMock.lecture.create.mockResolvedValue({ id: 'lecture-1', ...validData } as any);

        const result = await createLecture(validData, adminUser);

        expect(result.id).toBe('lecture-1');
        expect(prismaMock.lecture.create).toHaveBeenCalled();
    });

    test('should allow TEACHER to create lecture for themselves (Class Teacher)', async () => {
        prismaMock.class.findUnique.mockResolvedValue(mockClass as any);
        prismaMock.subject.findUnique.mockResolvedValue(mockSubject as any);
        prismaMock.user.findUnique.mockResolvedValue(teacherUser as any);
        prismaMock.lecture.create.mockResolvedValue({ id: 'lecture-1', ...validData } as any);

        const result = await createLecture({ ...validData, teacherId: 'teacher-1' }, teacherUser);

        expect(result.id).toBe('lecture-1');
    });

    test('should prevent TEACHER from creating lecture for OTHERS', async () => {
        // Service logic: Role=TEACHER -> if data.teacherId != user.id -> throw 403.
        await expect(createLecture({ ...validData, teacherId: 'teacher-2' }, teacherUser))
            .rejects.toThrow('Teachers can only create lectures for themselves');
    });

    test('should prevent unauthorized TEACHER (Not Class Teacher/Department)', async () => {
        const unauthorizedTeacher = { ...otherTeacherUser };

        prismaMock.class.findUnique.mockResolvedValue({
            ...mockClass,
            teacherId: 'teacher-1', // Someone else
            department: { teachers: [] } // Not in department
        } as any);
        prismaMock.subject.findUnique.mockResolvedValue(mockSubject as any);

        // even if they ask for themselves (if they were teacher-2), unauthorized check happens
        // Here unauthorizedTeacher is 'teacher-2'. 
        // Logic forces teacherId=teacher-2.
        // Check Authorization: Is teacher-2 class teacher? No. In dept? No.

        await expect(createLecture({ ...validData, teacherId: 'teacher-2' }, unauthorizedTeacher))
            .rejects.toThrow('authorized');
    });

    test('should fail if Subject is NOT linked to Class', async () => {
        prismaMock.class.findUnique.mockResolvedValue(mockClass as any);
        prismaMock.subject.findUnique.mockResolvedValue({
            ...mockSubject,
            classes: [] // Not linked
        } as any);

        await expect(createLecture(validData, adminUser))
            .rejects.toThrow('Subject is not assigned');
    });
});
