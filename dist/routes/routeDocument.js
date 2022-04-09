"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const search_1 = require("../services/mongo/search");
const list_1 = require("../services/mongo/list");
const save_1 = require("../services/mongo/save");
const delete_1 = require("../services/mongo/delete");
const router = express_1.default.Router();
exports.router = router;
router.get('', async (req, res) => {
    let response = await (0, list_1.ListDocuents)(req.body);
    if (response.status)
        res.status(200).json(response.data);
    else
        res.status(500).json(response.data);
});
router.post("/document/add", async (req, res) => {
    try {
        (0, save_1.Save)(req.body).then(response => res.json(response)).catch(error => res.json(error));
    }
    catch (error) {
        res.json(error);
    }
});
router.get("/document/serach", async (req, res) => {
    try {
        res.json(await (0, search_1.Search)().Home(req.body));
    }
    catch (error) {
        res.json(error);
    }
});
router.delete("/document/delete", async (req, res) => {
    try {
        res.json((0, delete_1.Delete)(req.body.id));
    }
    catch (error) {
        res.json(error);
    }
});
//# sourceMappingURL=routeDocument.js.map