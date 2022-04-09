"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const documentSchema_1 = require("../../schema/documentSchema");
const Delete = async (id) => {
    try {
        const query = { _id: id };
        const database = await documentSchema_1.CompetitionModel.deleteOne(query);
        return { status: true, data: database };
    }
    catch (error) {
        return { status: false, data: error };
    }
};
exports.Delete = Delete;
//# sourceMappingURL=delete.js.map