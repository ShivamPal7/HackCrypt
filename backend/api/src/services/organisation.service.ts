import prisma from '../config/prisma';
import ApiError from '../utils/ApiError';

export const createOrganisation = async (data: any, userId: string) => {
    // Check if user already has an organisation? 
    // Logic: User with ORGANISATION role creates an org.
    // We should link them.

    const organisation = await prisma.organisation.create({
        data: {
            name: data.name,
            users: {
                create: {
                    userId: userId,
                }
            }
        },
    });
    return organisation;
};

export const getOrganisation = async (id: string) => {
    const organisation = await prisma.organisation.findUnique({
        where: { id },
        include: {
            users: true,
            departments: true,
            classes: true,
        }
    });
    if (!organisation) throw new ApiError(404, 'Organisation not found');
    return organisation;
};

export const updateOrganisation = async (id: string, data: any) => {
    const organisation = await prisma.organisation.update({
        where: { id },
        data,
    });
    return organisation;
};

export const deleteOrganisation = async (id: string) => {
    await prisma.organisation.delete({ where: { id } });
    return { message: 'Organisation deleted' };
};
