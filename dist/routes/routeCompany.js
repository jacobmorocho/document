"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCompany = void 0;
const express_1 = __importDefault(require("express"));
const companyController_1 = require("../controller/companyController");
const routerCompany = express_1.default.Router();
exports.routerCompany = routerCompany;
routerCompany.post('/save', (0, companyController_1.companyController)().save);
//# sourceMappingURL=routeCompany.js.map