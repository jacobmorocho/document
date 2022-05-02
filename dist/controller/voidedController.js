"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voidedController = void 0;
const search_1 = require("../services/mongo/search");
const voidedController = () => {
    const Search = async (req, res) => {
        try {
            res.json(await (0, search_1.SearchVoided)().All(req.body));
        }
        catch (error) {
            res.json(error);
        }
    };
    return {
        search: Search
    };
};
exports.voidedController = voidedController;
//# sourceMappingURL=voidedController.js.map