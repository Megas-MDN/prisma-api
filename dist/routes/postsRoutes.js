"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController_1 = __importDefault(require("../controllers/postsController"));
const router = (0, express_1.Router)();
router.get('/all', postsController_1.default.getAllUsers);
router.post('/create', postsController_1.default.createPost);
exports.default = router;
//# sourceMappingURL=postsRoutes.js.map