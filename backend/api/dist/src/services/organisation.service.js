"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrganisation = exports.updateOrganisation = exports.getOrganisation = exports.createOrganisation = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const createOrganisation = async (data, userId) => {
    // Check if user already has an organisation? 
    // Logic: User with ORGANISATION role creates an org.
    // We should link them.
    const organisation = await prisma_1.default.organisation.create({
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
exports.createOrganisation = createOrganisation;
const getOrganisation = async (id) => {
    const organisation = await prisma_1.default.organisation.findUnique({
        where: { id },
        include: {
            users: true,
            departments: true,
            classes: true,
        }
    });
    if (!organisation)
        throw new ApiError_1.default(404, 'Organisation not found');
    return organisation;
};
exports.getOrganisation = getOrganisation;
const updateOrganisation = async (id, data) => {
    const organisation = await prisma_1.default.organisation.update({
        where: { id },
        data,
    });
    return organisation;
};
exports.updateOrganisation = updateOrganisation;
const deleteOrganisation = async (id) => {
    await prisma_1.default.organisation.delete({ where: { id } });
    return { message: 'Organisation deleted' };
};
exports.deleteOrganisation = deleteOrganisation;
