"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoutes_1 = __importDefault(require("./usersRoutes"));
const postsRoutes_1 = __importDefault(require("./postsRoutes"));
const crudRoutes_1 = __importDefault(require("./crudRoutes"));
const errorHandler_1 = require("../middlewares/errorHandler");
const router = (0, express_1.Router)();
router.use('/users', usersRoutes_1.default);
router.use('/posts', postsRoutes_1.default);
router.use('/resource', crudRoutes_1.default);
router.use(errorHandler_1.errorHandler);
exports.default = router;
//# sourceMappingURL=index.js.map