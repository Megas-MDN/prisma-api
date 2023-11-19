"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const getAllUsers = async () => {
    const users = await _1.default.user.findMany({
        where: {
            deletedAt: null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return users;
};
exports.default = { getAllUsers };
//# sourceMappingURL=usersModel.js.map