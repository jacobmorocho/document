"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const documentController_1 = require("../controller/documentController");
const router = express_1.default.Router();
exports.router = router;
router.get('/list', auth_1.Auth, (0, documentController_1.documentController)().list);
router.post("/document/add", auth_1.Auth, (0, documentController_1.documentController)().add);
router.get("/document/serach", auth_1.Auth, (0, documentController_1.documentController)().serach);
router.delete("/document/delete", auth_1.Auth, (0, documentController_1.documentController)().delete);
router.put("/document/update/:id", auth_1.Auth, (0, documentController_1.documentController)().update);
//# sourceMappingURL=routeDocument.js.map