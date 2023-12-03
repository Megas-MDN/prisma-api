"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const seedCreator_1 = require("./seedCreator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/health', (_req, res) => res.status(200).send({ message: `Server online ${process.env.PORT || 3001}` }));
app.use(routes_1.default);
(0, seedCreator_1.readAllTables)({
    logTables: true,
    allSeeds: false,
    seedFile: false,
    onlyTables: ['Recomend'], // optional: default []
    // arrFilters: filters, // optional: default []
});
exports.default = app;
//# sourceMappingURL=app.js.map