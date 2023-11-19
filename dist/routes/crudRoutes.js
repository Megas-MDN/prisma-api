"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crudController_1 = __importDefault(require("../controllers/crudController"));
const router = (0, express_1.Router)();
router.get('/all', crudController_1.default.getAll);
router.get('/:table', crudController_1.default.getBy);
router.get('/:table/:id', crudController_1.default.getById);
router.put('/:table/:id', crudController_1.default.update);
router.delete('/:table/:id', crudController_1.default.remove);
router.post('/create', crudController_1.default.create);
const routesAvalible = [
    { route: '/all', method: 'GET' },
    { route: '/:table', query: ['key', 'value'], method: 'GET' },
    { route: '/:table/:id', method: 'GET' },
    { route: '/:table/:id', method: 'PUT' },
    { route: '/:table/:id', method: 'DELETE' },
    { route: '/create', method: 'POST' },
];
router.use((_req, res) => {
    return res
        .status(501)
        .send({ message: 'Route not implemented', rotes: routesAvalible });
});
exports.default = router;
//# sourceMappingURL=crudRoutes.js.map