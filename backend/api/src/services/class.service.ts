import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const createClass = async (data: any) => {
    const classData = await prisma.class.create({
        data,
    });
    return classData;
};

export const getClass = async (id: string) => {
    const classData = await prisma.class.findUnique({
        where: { id },
        include: { lectures: true, subjects: true, students: true, teacher: true }
    });
    if (!classData) throw new ApiError(404, 'Class not found');
    return classData;
};

export const updateClass = async (id: string, data: any) => {
    const classData = await prisma.class.update({
        where: { id },
        data,
    });
    return classData;
};

export const deleteClass = async (id: string) => {
    await prisma.class.delete({ where: { id } });
    return { message: 'Class deleted' };
};
