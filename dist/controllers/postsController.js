"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postsService_1 = __importDefault(require("../../src/services/postsService"));
const fetchService_1 = __importDefault(require("../../src/services/fetchService"));
const getAllUsers = async (req, res) => {
    const users = await postsService_1.default.getAllUsers();
    return res.status(200).send(users);
};
const createPost = async (req, res, next) => {
    const { title, content, user_id } = req.body;
    if (!title || !content || !user_id) {
        return next({
            status: 400,
            message: 'Filds id, title, contentt, userId are required',
        });
    }
    const newPost = {
        title,
        content,
        user_id,
    };
    const post = await postsService_1.default.createPost(newPost);
    fetchService_1.default.fetchPostSocket();
    return res.status(201).send(post);
};
exports.default = { getAllUsers, createPost };
//# sourceMappingURL=postsController.js.map