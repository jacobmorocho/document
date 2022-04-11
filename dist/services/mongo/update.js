"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const documentvalidate_1 = require("../../services/validate/documentvalidate");
const documentSchema_1 = require("../../schema/documentSchema");
const Update = ({ _id, paylod }, callback) => {
    let response = (0, documentvalidate_1.documentvalidate)(paylod);
    if (!response.status) {
        callback(response, null);
    }
    else {
        documentSchema_1.CompetitionModel.findByIdAndUpdate(_id, paylod, callback);
    }
};
exports.Update = Update;
//# sourceMappingURL=update.js.map