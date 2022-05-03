"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyController = void 0;
const search_1 = require("../services/mongo/search");
const save_1 = require("../services/mongo/save");
const companyController = () => {
    const Save = (req, res) => {
        try {
            (0, save_1.SaveCompany)(req.body).then(response => {
                if (response && !response.status) {
                    res.json({ status: response.status, response });
                }
                else {
                    res.json({ status: response.status, message: "successfully" });
                }
            }).catch(error => res.json(error));
        }
        catch (error) {
            res.json({ status: false, message: error });
        }
    };
    const List = (req, res) => {
        (0, search_1.SearchCompany)().all()
            .then((response) => {
            res.json(response);
        })
            .catch((err) => {
            res.json(err);
        });
    };
    return {
        save: Save,
        list: List
    };
};
exports.companyController = companyController;
//# sourceMappingURL=companyController.js.map