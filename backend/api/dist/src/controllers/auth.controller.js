"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.refresh = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/auth.service"));
const response_1 = require("../utils/response");
const register = async (req, res, next) => {
    const result = await authService.register(req.body);
    (0, response_1.sendResponse)(res, 201, 'User registered successfully', result);
};
exports.register = register;
const login = async (req, res, next) => {
    const result = await authService.login(req.body);
    (0, response_1.sendResponse)(res, 200, 'Login successful', result);
};
exports.login = login;
const refresh = async (req, res, next) => {
    const result = await authService.refreshToken(req.body.refreshToken);
    (0, response_1.sendResponse)(res, 200, 'Tokens refreshed successfully', result);
};
exports.refresh = refresh;
const getMe = async (req, res, next) => {
    // req.user is set by auth middleware
    const result = await authService.getMe(req.user.id);
    (0, response_1.sendResponse)(res, 200, 'User profile retrieved', result);
};
exports.getMe = getMe;
