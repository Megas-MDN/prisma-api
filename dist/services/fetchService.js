"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fetchService = async (destiny) => {
    try {
        const res = await (0, axios_1.default)({
            method: 'POST',
            url: `${process.env.URL_SOCKET}/send/message`,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            data: {
                destiny,
                message: 'Go fetch the posts',
            },
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
        return error.message;
    }
};
const fetchPostSocket = async () => fetchService('fetchPost');
exports.default = {
    fetchPostSocket,
};
//# sourceMappingURL=fetchService.js.map