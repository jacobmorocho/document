"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDocuents = void 0;
const documentSchema_1 = require("../../schema/documentSchema");
const ListDocuents = async (param) => {
    try {
        const database = await documentSchema_1.DocumentModel.find();
        return { status: true, data: database };
    }
    catch (error) {
        return { status: false, data: error };
    }
};
exports.ListDocuents = ListDocuents;
//# sourceMappingURL=list.js.map