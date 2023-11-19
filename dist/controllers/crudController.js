"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crudService_1 = __importDefault(require("../services/crudService"));
const getAll = async (req, res, next) => {
    try {
        const { table } = req.params;
        const users = await crudService_1.default.getAll(table);
        return res.status(200).send(users);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
const getById = async (req, res, next) => {
    try {
        const { table, id } = req.params;
        const user = await crudService_1.default.getById(table, id);
        return res.status(200).send(user);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
const getBy = async (req, res, next) => {
    try {
        const { table } = req.params;
        const { key, value } = req.query;
        const user = await crudService_1.default.getBy(table, `${key}`, `${value}`);
        return res.status(200).send(user);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
const create = async (req, res, next) => {
    try {
        const { table } = req.params;
        const data = req.body;
        const user = await crudService_1.default.create(table, data);
        return res.status(201).send(user);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
const update = async (req, res, next) => {
    try {
        const { table, id } = req.params;
        const data = req.body;
        const user = await crudService_1.default.update(table, id, data);
        return res.status(200).send(user);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
const remove = async (req, res, next) => {
    try {
        const { table, id } = req.params;
        const user = await crudService_1.default.remove(table, id);
        return res.status(200).send(user);
    }
    catch (error) {
        return next({ status: 500, message: error.message });
    }
};
exports.default = { getAll, getById, getBy, create, update, remove };
//# sourceMappingURL=crudController.js.map