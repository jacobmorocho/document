"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const documentSchema_1 = require("../../schema/documentSchema");
const Search = () => {
    const Correlative = async (query) => {
        const order = await documentSchema_1.CompetitionModel.find(query).sort({ correlativo: -1 }).limit(1);
        ;
        return order;
    };
    const Home = async (param) => {
        let query = {};
        if (param.idDocument) {
            query['idDocument'] = param.idDocument;
        }
        if (param.client) {
            query['client.ruc'] = param.client;
        }
        if (param.tipoDoc) {
            query['tipoDoc'] = param.tipoDoc;
        }
        if (param.mindate && param.maxdate) {
            query['fechaEmision'] = {
                '$gte': new Date(new Date(param.mindate).setHours(0, 0, 0)),
                '$lte': new Date(new Date(param.maxdate).setHours(23, 59, 59))
            };
        }
        console.log(query);
        const document = await documentSchema_1.CompetitionModel.find(query).sort({ correlativo: -1 }).limit(50).lean();
        console.log(document);
        return document;
    };
    return {
        Correlative: Correlative,
        Home: Home,
    };
};
exports.Search = Search;
//# sourceMappingURL=search.js.map