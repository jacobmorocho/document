"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyController = void 0;
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
    return {
        save: Save
    };
};
exports.companyController = companyController;
//# sourceMappingURL=companyController.js.map