"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchCompany = exports.SearchVoided = exports.SearchDocument = void 0;
const voidedSchema_1 = require("../../schema/voidedSchema");
const documentSchema_1 = require("../../schema/documentSchema");
const companySchema_1 = require("../../schema/companySchema");
const SearchDocument = () => {
    const Correlative = async (doc) => {
        let query = {};
        query['serie'] = doc.serie;
        query['company.ruc'] = doc.company.ruc;
        let document = await documentSchema_1.DocumentModel.find(query).sort({ correlativo: -1 }).limit(1);
        if (document && document.length > 0) {
            return (document[0].correlativo + 1);
        }
        return 1;
    };
    const All = async (body) => {
        let query = {};
        if (body._id) {
            query['_id'] = body._id;
        }
        if (body.tipoOperacion) {
            query['tipoOperacion'] = body.tipoOperacion;
        }
        if (body.tipoDoc) {
            query['tipoDoc'] = { $in: body.tipoDoc.split(',') };
        }
        if (body.serie) {
            query['serie'] = body.serie;
        }
        if (body.tipoMoneda) {
            query['tipoMoneda'] = body.tipoMoneda;
        }
        if (body.numDoc) {
            query['numDoc'] = body.numDoc;
        }
        if (body.client) {
            if (body.client.numDoc) {
                query['client.numDoc'] = body.client.numDoc;
            }
            if (body.client.razonSocial) {
                query['client.razonSocial'] = body.client.razonSocial;
            }
            if (body.client.nombreComercial) {
                query['client.nombreComercial'] = body.client.nombreComercial;
            }
        }
        if (body.company) {
            if (body.company.ruc) {
                query['company.ruc'] = body.company.ruc;
            }
            if (body.company.razonSocial) {
                query['company.razonSocial'] = body.company.razonSocial;
            }
            if (body.company.nombreComercial) {
                query['company.nombreComercial'] = body.company.nombreComercial;
            }
        }
        if (body.minfechaEmision && body.maxfechaEmision) {
            query['fechaEmision'] = {
                '$gte': new Date(new Date(body.minfechaEmision).setHours(0, 0, 0)),
                '$lte': new Date(new Date(body.maxfechaEmision).setHours(23, 59, 59))
            };
        }
        const documents = await documentSchema_1.DocumentModel.find(query).sort({ correlativo: -1 }).limit(50).lean();
        return documents;
    };
    const ById = async (id) => {
        return await documentSchema_1.DocumentModel.findById(id);
    };
    const NoteByParent = async (parentId) => {
        let query = {};
        query['note.parentID'] = parentId;
        let document = await documentSchema_1.DocumentModel.find(query).sort({ correlativo: -1 }).limit(1);
        if (document && document.length > 0) {
            return (document[0]);
        }
        return null;
    };
    return {
        Correlative: Correlative,
        All: All,
        ById: ById,
        NoteByParent
    };
};
exports.SearchDocument = SearchDocument;
const SearchVoided = () => {
    const Correlative = async (doc) => {
        let query = {};
        query['serie'] = doc.serie;
        query['company.ruc'] = doc.company.ruc;
        let document = await voidedSchema_1.VoidedModel.find(query).sort({ correlativo: -1 }).limit(1);
        if (document && document.length > 0) {
            return (document[0].correlativo + 1);
        }
        return 1;
    };
    const All = async (body) => {
        let query = {};
        const documents = await voidedSchema_1.VoidedModel.find(query).sort({ correlativo: -1 }).limit(50).lean();
        return documents;
    };
    const ById = async (id) => {
        return await voidedSchema_1.VoidedModel.findById(id);
    };
    const ByParent = async (parentId) => {
        let query = {};
        query['parentDocument'] = parentId;
        let document = await voidedSchema_1.VoidedModel.find(query).sort({ correlativo: -1 }).limit(1);
        if (document && document.length > 0) {
            return (document[0]);
        }
        return null;
    };
    return {
        Correlative: Correlative,
        ById: ById,
        ByParent,
        All
    };
};
exports.SearchVoided = SearchVoided;
const SearchCompany = () => {
    const All = async () => {
        let companys = await companySchema_1.CompanyModel.find().sort({ _id: -1 });
        return companys;
    };
    return {
        all: All
    };
};
exports.SearchCompany = SearchCompany;
//# sourceMappingURL=search.js.map