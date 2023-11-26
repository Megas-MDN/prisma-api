"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seedCreator_1 = __importDefault(require("../models/seedCreator"));
const callSeedCreator = async () => {
    const item = await seedCreator_1.default.readAllTables();
    return item;
};
exports.default = { callSeedCreator };
//# sourceMappingURL=callSeedCreator.js.map