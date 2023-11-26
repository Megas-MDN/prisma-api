"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const callSeedCreator_1 = __importDefault(require("../services/callSeedCreator"));
const getAllSeeds = async (req, res) => {
    const seedy = await callSeedCreator_1.default.callSeedCreator();
    return res.status(200).send(seedy);
};
exports.default = { getAllSeeds };
//# sourceMappingURL=goSeed.js.map