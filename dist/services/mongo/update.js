"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidedUpdate = exports.DocumentUpdate = void 0;
const documentvalidate_1 = require("../../services/validate/documentvalidate");
const documentSchema_1 = require("../../schema/documentSchema");
const voidedSchema_1 = require("../../schema/voidedSchema");
const DocumentUpdate = () => {
    const Update = ({ _id, paylod }, callback) => {
        let response = (0, documentvalidate_1.documentvalidate)(paylod);
        if (!response.status) {
            callback(response);
        }
        else {
            documentSchema_1.DocumentModel.findByIdAndUpdate(_id, paylod, callback);
        }
    };
    return { Update };
};
exports.DocumentUpdate = DocumentUpdate;
const VoidedUpdate = () => {
    const Update = ({ _id, paylod }, callback) => {
        voidedSchema_1.VoidedModel.findByIdAndUpdate(_id, paylod, callback);
    };
    return { Update };
};
exports.VoidedUpdate = VoidedUpdate;
//# sourceMappingURL=update.js.map