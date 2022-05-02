"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routebilling = void 0;
const express_1 = __importDefault(require("express"));
const billingController_1 = require("../controller/billingController");
const routebilling = express_1.default.Router();
exports.routebilling = routebilling;
routebilling.get('/invoice/:id', (0, billingController_1.billingController)().Invoice().Send);
routebilling.post('/note', (0, billingController_1.billingController)().Note().Send);
routebilling.post('/voided', (0, billingController_1.billingController)().Voided().Send);
//# sourceMappingURL=routeBilling.js.map