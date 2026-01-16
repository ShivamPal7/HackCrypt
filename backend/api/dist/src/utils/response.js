"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data) => {
    const response = {
        success: true,
        message,
        data,
    };
    res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
const sendError = (res, statusCode, message, errors) => {
    const response = {
        success: false,
        message,
        errors,
    };
    res.status(statusCode).json(response);
};
exports.sendError = sendError;
