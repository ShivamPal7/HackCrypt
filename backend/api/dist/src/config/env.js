"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('3000'),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    JWT_EXPIRES_IN: zod_1.z.string().default('1d'),
    JWT_REFRESH_SECRET: zod_1.z.string(),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default('7d'),
});
const env = envSchema.parse(process.env);
exports.default = env;
