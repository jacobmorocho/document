"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeVoided = void 0;
const express_1 = __importDefault(require("express"));
const voidedController_1 = require("../controller/voidedController");
const routeVoided = express_1.default.Router();
exports.routeVoided = routeVoided;
routeVoided.post('/search', (0, voidedController_1.voidedController)().search);
//# sourceMappingURL=routeVoided.js.map