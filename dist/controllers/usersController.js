"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersService_1 = __importDefault(require("../../src/services/usersService"));
const getAllUsers = async (req, res) => {
    const users = await usersService_1.default.getAllUsers();
    return res.status(200).send(users);
};
exports.default = { getAllUsers };
//# sourceMappingURL=usersController.js.map