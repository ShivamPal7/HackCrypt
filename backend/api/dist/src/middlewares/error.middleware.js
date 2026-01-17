"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || undefined;
    if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = err.errors;
    }
    (0, response_1.sendError)(res, statusCode, message, errors);
};
exports.errorHandler = errorHandler;
