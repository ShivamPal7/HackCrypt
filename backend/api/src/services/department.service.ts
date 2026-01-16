import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const createDepartment = async (data: any) => {
    const department = await prisma.department.create({
        data,
    });
    return department;
};

export const getDepartment = async (id: string) => {
    const department = await prisma.department.findUnique({
        where: { id },
        include: { classes: true, teachers: true }
    });
    if (!department) throw new ApiError(404, 'Department not found');
    return department;
};

export const updateDepartment = async (id: string, data: any) => {
    const department = await prisma.department.update({
        where: { id },
        data,
    });
    return department;
};

export const deleteDepartment = async (id: string) => {
    await prisma.department.delete({ where: { id } });
    return { message: 'Department deleted' };
};
