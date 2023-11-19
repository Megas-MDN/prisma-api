"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
const getAllUsers = async () => {
    const users = await _1.default.post.findMany({
        where: {
            deletedAt: null,
        },
        select: {
            id: true,
            title: true,
            content: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return users;
};
const createPost = async (newPost) => {
    const post = await _1.default.post.create({
        data: {
            ...newPost,
        },
    });
    return post;
};
exports.default = { getAllUsers, createPost };
//# sourceMappingURL=postsMoldel.js.map