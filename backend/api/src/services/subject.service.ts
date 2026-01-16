import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const createSubject = async (data: any) => {
    const subject = await prisma.subject.create({
        data,
    });
    return subject;
};

export const getSubject = async (id: string) => {
    const subject = await prisma.subject.findUnique({
        where: { id },
        include: { lectures: true }
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

export const getSubjects = async (institutionId: string) => {
    return await prisma.subject.findMany({
        where: { institutionId },
        include: { lectures: true }
    });
};

export const deleteSubject = async (id: string) => {
    await prisma.subject.delete({ where: { id } });
    return { message: 'Subject deleted' };
};
