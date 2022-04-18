"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeraws = void 0;
const express_1 = __importDefault(require("express"));
const awsController_1 = require("../controller/awsController");
const routeraws = express_1.default.Router();
exports.routeraws = routeraws;
routeraws.get('/dowload', (0, awsController_1.awsController)().dowload);
routeraws.post('/upload', (0, awsController_1.awsController)().upload);
//# sourceMappingURL=routeAws.js.map