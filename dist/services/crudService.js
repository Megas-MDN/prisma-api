"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crudModel_1 = __importDefault(require("../models/crudModel"));
const getAll = async (table) => {
    const item = await crudModel_1.default.getAll(table);
    return item;
};
const getById = async (table, id) => {
    const item = await crudModel_1.default.getById(table, id);
    return item;
};
const getBy = async (table, key, value) => {
    const item = await crudModel_1.default.getBy(table, key, value);
    return item;
};
const create = async (table, data) => {
    const item = await crudModel_1.default.create(table, data);
    return item;
};
const update = async (table, id, data) => {
    const item = await crudModel_1.default.update(table, id, data);
    return item;
};
const remove = async (table, id) => {
    const item = await crudModel_1.default.remove(table, id);
    return item;
};
exports.default = { getAll, getById, getBy, create, update, remove };
//# sourceMappingURL=crudService.js.map