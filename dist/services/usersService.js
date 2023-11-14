"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = __importDefault(require("../../src/models/usersModel"));
const getAllUsers = async () => {
    const users = await usersModel_1.default.getAllUsers();
    return users;
};
exports.default = { getAllUsers };
//# sourceMappingURL=usersService.js.map