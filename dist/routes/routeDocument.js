"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeDocument = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const documentController_1 = require("../controller/documentController");
const routeDocument = express_1.default.Router();
exports.routeDocument = routeDocument;
routeDocument.get('/list', auth_1.Auth, (0, documentController_1.documentController)().list);
routeDocument.post("/add", auth_1.Auth, (0, documentController_1.documentController)().add);
routeDocument.get("/serach", auth_1.Auth, (0, documentController_1.documentController)().serach);
routeDocument.delete("/delete", auth_1.Auth, (0, documentController_1.documentController)().delete);
routeDocument.put("/update/:id", auth_1.Auth, (0, documentController_1.documentController)().update);
//# sourceMappingURL=routeDocument.js.map