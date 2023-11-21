"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.genToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || 'secret';
const genToken = ({ expires = '8h', payload, }) => {
    const jwtConfig = {
        expiresIn: expires,
    };
    return jsonwebtoken_1.default.sign(payload, secret, jwtConfig);
};
exports.genToken = genToken;
const validateToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        return { status: 401, message: 'Expired or invalid token' };
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=token.js.map