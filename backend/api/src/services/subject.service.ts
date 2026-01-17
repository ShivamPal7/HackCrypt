import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const createSubject = async (data: any) => {
    // Create independent subject
    const subject = await prisma.subject.create({
        data: {
            name: data.name,
            code: data.code,
            description: data.description,
            colorCode: data.colorCode,
            icon: data.icon,
            institutionId: data.institutionId,
            // Optional: Initial assignments if provided
            classes: data.classId ? { connect: { id: data.classId } } : undefined,
            departments: data.departmentId ? { connect: { id: data.departmentId } } : undefined,
        },
    });

    // Auto-link logic if classId was provided
    if (data.classId) {
        await autoLinkSubjectToDepartment(subject.id, data.classId);
    }

    return subject;
};

// Helper to ensure Subject is linked to Class's Department
const autoLinkSubjectToDepartment = async (subjectId: string, classId: string) => {
    const classData = await prisma.class.findUnique({
        where: { id: classId },
        select: { departmentId: true }
    });
    if (classData && classData.departmentId) {
        // Connect subject to department
        await prisma.subject.update({
            where: { id: subjectId },
            data: {
                departments: { connect: { id: classData.departmentId } }
            }
        });
    }
}

export const assignSubjectToClass = async (subjectId: string, classId: string, institutionId: string) => {
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.institutionId !== institutionId) throw new ApiError(404, 'Subject not found');

    const clazz = await prisma.class.findUnique({ where: { id: classId } });
    if (!clazz || clazz.institutionId !== institutionId) throw new ApiError(404, 'Class not found');

    // 1. Link to Class
    await prisma.subject.update({
        where: { id: subjectId },
        data: {
            classes: { connect: { id: classId } }
        }
    });

    // 2. Auto-link to Department
    await autoLinkSubjectToDepartment(subjectId, classId);

    return { message: 'Subject assigned to class and linked to department' };
};

export const assignSubjectToDepartment = async (subjectId: string, departmentId: string, institutionId: string) => {
    const subject = await prisma.subject.findUnique({ where: { id: subjectId } });
    if (!subject || subject.institutionId !== institutionId) throw new ApiError(404, 'Subject not found');

    const department = await prisma.department.findUnique({ where: { id: departmentId } });
    if (!department || department.institutionId !== institutionId) throw new ApiError(404, 'Department not found');

    await prisma.subject.update({
        where: { id: subjectId },
        data: {
            departments: { connect: { id: departmentId } }
        }
    });

    return { message: 'Subject assigned to department' };
};

export const getSubject = async (id: string) => {
    const subject = await prisma.subject.findUnique({
        where: { id },
        include: { lectures: true, classes: true, departments: true }
    });
    if (!subject) throw new ApiError(404, 'Subject not found');
    return subject;
};

export const updateSubject = async (id: string, data: any) => {
    const subject = await prisma.subject.update({
        where: { id },
        data,
    });
    return subject;
};

export const getSubjects = async (institutionId: string, filters?: { classId?: string, departmentId?: string }) => {
    const where: any = { institutionId };
    if (filters?.classId) {
        where.classes = { some: { id: filters.classId } };
    }
    if (filters?.departmentId) {
        where.departments = { some: { id: filters.departmentId } };
    }

    return await prisma.subject.findMany({
        where,
        include: { classes: true, departments: true }
    });
};

export const deleteSubject = async (id: string) => {
    await prisma.subject.delete({ where: { id } });
    return { message: 'Subject deleted' };
};
