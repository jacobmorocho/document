"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const axios_1 = __importDefault(require("axios"));
const Auth = async (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(400).send({ "sRpta": "Se requiere ingresar token." });
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization
        }
    };
    await axios_1.default.get("https://sami-ms-auth-qa.herokuapp.com/users/token/validar", headers).then(response => {
        req.user = response.data;
        return next();
    }).catch(error => {
        return res.status(400).send({ "sRpta": error.response.data });
    });
};
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map