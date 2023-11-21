"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = require("./token");
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const decoded = (0, token_1.validateToken)(authorization);
    if (!decoded) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
    res.locals.user = decoded;
    return next();
};
//# sourceMappingURL=auth.js.map