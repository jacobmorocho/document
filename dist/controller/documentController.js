"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentController = void 0;
const save_1 = require("../services/mongo/save");
const list_1 = require("../services/mongo/list");
const search_1 = require("../services/mongo/search");
const delete_1 = require("../services/mongo/delete");
const update_1 = require("../services/mongo/update");
const aws_1 = require("../services/aws");
const documentController = () => {
    const List = async (req, res) => {
        let response = await (0, list_1.ListDocuents)(req.body);
        if (response.status)
            res.status(200).json(response.data);
        else
            res.status(500).json(response.data);
    };
    const Add = async (req, res) => {
        try {
            let response = await (0, save_1.SaveDocument)(req.body);
            let aws = await (0, aws_1.TicketUpload)(response.data.id);
            res.json(response);
        }
        catch (error) {
            res.json({ status: false, message: error });
        }
    };
    const Serach = async (req, res) => {
        try {
            res.json(await (0, search_1.SearchDocument)().All(req.body));
        }
        catch (error) {
            res.json(error);
        }
    };
    const Deleted = (req, res) => {
        try {
            res.json((0, delete_1.Delete)(req.body.id));
        }
        catch (error) {
            res.json(error);
        }
    };
    const Updated = (req, res) => {
        const { id: _id } = req.params;
        const paylod = req.body;
        (0, update_1.DocumentUpdate)().Update({ _id, paylod }, (err, updatedDocument) => {
            if (err) {
                res.json({ success: false, msg: err });
            }
            else {
                res.json({ success: true, message: 'successfully updated' });
            }
        });
    };
    return {
        list: List,
        add: Add,
        serach: Serach,
        delete: Deleted,
        update: Updated
    };
};
exports.documentController = documentController;
//# sourceMappingURL=documentController.js.map