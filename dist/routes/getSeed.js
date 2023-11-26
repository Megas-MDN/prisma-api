"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goSeed_1 = __importDefault(require("../controllers/goSeed"));
const router = (0, express_1.Router)();
router.get('/', goSeed_1.default.getAllSeeds);
exports.default = router;
//# sourceMappingURL=getSeed.js.map