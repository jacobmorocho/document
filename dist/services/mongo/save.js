"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveCompany = exports.SaveVoided = exports.SaveDocument = void 0;
const voidedSchema_1 = require("../../schema/voidedSchema");
const documentSchema_1 = require("../../schema/documentSchema");
const documentvalidate_1 = require("../../services/validate/documentvalidate");
const search_1 = require("./search");
const companySchema_1 = require("../../schema/companySchema");
const SaveDocument = async (body) => {
    let response = (0, documentvalidate_1.documentvalidate)(body);
    if (!response.status) {
        return response;
    }
    else {
        var document = new documentSchema_1.DocumentModel(body);
        document.correlativo = await (0, search_1.SearchDocument)().Correlative(document);
        document.numDoc = `${document.serie}-${document.correlativo}`;
        document.idDocument = `${document.company.ruc}-${document.serie}-${document.correlativo}`;
        document.estado = "REGISTRO";
        let data = await document.save();
        return { status: true, data };
    }
};
exports.SaveDocument = SaveDocument;
const SaveVoided = async (body) => {
    var document = new voidedSchema_1.VoidedModel(body.document);
    document.correlativo = await (0, search_1.SearchVoided)().Correlative(document);
    document.parentDocument = body.doc._id;
    document.idDocument = `${document.company.ruc}-${body.document.serie}-${document.correlativo}`;
    document.sunatResponse.success = false;
    document.sunatResponse.ticket = "";
    document.parent = body.doc;
    return await document.save();
};
exports.SaveVoided = SaveVoided;
const SaveCompany = async (body) => {
    let response = (0, documentvalidate_1.companyvalidate)(body);
    if (!response.status) {
        return response;
    }
    else {
        var campany = new companySchema_1.CompanyModel(body);
        return await campany.save();
    }
};
exports.SaveCompany = SaveCompany;
//# sourceMappingURL=save.js.map