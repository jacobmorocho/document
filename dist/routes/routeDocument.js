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
const update_1 = require("../services/mongo/update");
const auth_1 = require("middlewares/auth");
const router = express_1.default.Router();
exports.router = router;
router.get('/list', auth_1.Auth, async (req, res) => {
    let response = await (0, list_1.ListDocuents)(req.body);
    if (response.status)
        res.status(200).json(response.data);
    else
        res.status(500).json(response.data);
});
router.post("/document/add", auth_1.Auth, async (req, res) => {
    try {
        (0, save_1.Save)(req.body).then(response => res.json({ status: true, message: "successfully" })).catch(error => res.json(error));
    }
    catch (error) {
        res.json({ status: false, message: error });
    }
});
router.get("/document/serach", auth_1.Auth, async (req, res) => {
    try {
        console.log(req.body);
        res.json(await (0, search_1.Search)().All(req.body));
    }
    catch (error) {
        res.json(error);
    }
});
router.delete("/document/delete", auth_1.Auth, async (req, res) => {
    try {
        res.json((0, delete_1.Delete)(req.body.id));
    }
    catch (error) {
        res.json(error);
    }
});
router.put("/document/update/:id", auth_1.Auth, async (req, res) => {
    const { id: _id } = req.params;
    const paylod = req.body;
    (0, update_1.Update)({ _id, paylod }, (err, updatedDocument) => {
        if (err) {
            res.json({ paylod, success: false, msg: err });
        }
        else {
            res.json({ success: true, message: 'successfully updated' });
        }
    });
});
//# sourceMappingURL=routeDocument.js.map