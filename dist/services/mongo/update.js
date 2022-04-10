"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = void 0;
const documentSchema_1 = require("../../schema/documentSchema");
const Update = ({ _id, paylod }, callback) => {
    documentSchema_1.CompetitionModel.findByIdAndUpdate(_id, paylod, callback);
};
exports.Update = Update;
//# sourceMappingURL=update.js.map