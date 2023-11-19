"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    return res
        .status(error.status || 500)
        .send({ message: error.message || 'Internal server error' });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map