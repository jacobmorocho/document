"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeXml = void 0;
const express_1 = __importDefault(require("express"));
const xmlController_1 = require("../controller/xmlController");
const routeXml = express_1.default.Router();
exports.routeXml = routeXml;
routeXml.get('/dowload/:id', (0, xmlController_1.xmlController)().dowload);
//# sourceMappingURL=routeXml.js.map