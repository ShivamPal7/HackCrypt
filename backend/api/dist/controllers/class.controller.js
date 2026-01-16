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
exports.remove = exports.update = exports.getAll = exports.get = exports.create = void 0;
const classService = __importStar(require("../services/class.service"));
const response_1 = require("../utils/response");
const create = async (req, res, next) => {
    const data = { ...req.body, institutionId: req.user.institutionId };
    const result = await classService.createClass(data);
    (0, response_1.sendResponse)(res, 201, 'Class created successfully', result);
};
exports.create = create;
const get = async (req, res, next) => {
    const result = await classService.getClass(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Class retrieved', result);
};
exports.get = get;
const getAll = async (req, res, next) => {
    const result = await classService.getClasses(req.user.institutionId);
    (0, response_1.sendResponse)(res, 200, 'Classes retrieved', result);
};
exports.getAll = getAll;
const update = async (req, res, next) => {
    const result = await classService.updateClass(req.params.id, req.body);
    (0, response_1.sendResponse)(res, 200, 'Class updated', result);
};
exports.update = update;
const remove = async (req, res, next) => {
    const result = await classService.deleteClass(req.params.id);
    (0, response_1.sendResponse)(res, 200, 'Class deleted', result);
};
exports.remove = remove;
