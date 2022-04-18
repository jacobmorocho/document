"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerpdf = void 0;
const express_1 = __importDefault(require("express"));
const pdfController_1 = require("../controller/pdfController");
const routerpdf = express_1.default.Router();
exports.routerpdf = routerpdf;
routerpdf.get('/dowload/voucher/:id', (0, pdfController_1.pdfController)().voucher);
routerpdf.get('/dowload/ticket/:id', (0, pdfController_1.pdfController)().ticket);
//# sourceMappingURL=routePdf.js.map