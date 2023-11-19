"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postsMoldel_1 = __importDefault(require("../models/postsMoldel"));
const getAllUsers = async () => {
    const users = await postsMoldel_1.default.getAllUsers();
    return users;
};
const createPost = async (newPost) => {
    const postToCreate = {
        title: newPost.title,
        content: newPost.content,
        user_id: newPost.user_id,
    };
    const post = await postsMoldel_1.default.createPost(postToCreate);
    return post;
};
exports.default = { getAllUsers, createPost };
//# sourceMappingURL=postsService.js.map