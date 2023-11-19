"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const getAll = async (table) => {
    const items = await _1.default[table]?.findMany({
        where: {
            deletedAt: null,
        },
    });
    return items;
};
const getById = async (table, id) => {
    const item = await _1.default[table]?.findUnique({
        where: {
            id,
        },
    });
    return item;
};
const getBy = async (table, key, value) => {
    const item = await _1.default[table]?.findUnique({
        where: {
            [key]: value,
        },
    });
    return item;
};
const create = async (table, data) => {
    const item = await _1.default[table]?.create({
        data,
    });
    return item;
};
const update = async (table, id, data) => {
    const item = await _1.default[table]?.update({
        where: {
            id,
        },
        data,
    });
    return item;
};
const remove = async (table, id) => {
    const item = await _1.default[table]?.update({
        where: {
            id,
        },
        data: {
            deletedAt: new Date(),
        },
    });
    return item;
};
exports.default = { getAll, getById, getBy, create, update, remove };
//# sourceMappingURL=crudModel.js.map