"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentToVoided = exports.DocumentToVoidedNew = exports.DocumentToNote = exports.InvoiceToNote = exports.DocumentToInvoice = void 0;
const search_1 = require("../../services/mongo/search");
const moment_1 = __importDefault(require("moment"));
const DocumentToInvoice = async (id) => {
    let doc = await (0, search_1.SearchDocument)().ById(id);
    return {
        ublVersion: doc.ublVersion,
        tipoOperacion: doc.tipoOperacion,
        tipoDoc: doc.tipoDoc,
        serie: doc.serie,
        correlativo: doc.correlativo.toString(),
        fechaEmision: (0, moment_1.default)(doc.fechaEmision).format(),
        formaPago: doc.formaPago,
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        valorVenta: doc.valorVenta,
        totalImpuestos: doc.totalImpuestos,
        subTotal: doc.subTotal,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
    };
};
exports.DocumentToInvoice = DocumentToInvoice;
const InvoiceToNote = async (id) => {
    let doc = await (0, search_1.SearchDocument)().ById(id);
    return {
        numDoc: "",
        ublVersion: doc.ublVersion,
        tipoOperacion: doc.tipoOperacion,
        tipoDoc: "07",
        serie: "",
        correlativo: 1,
        fechaEmision: (0, moment_1.default)(new Date()).format().toString(),
        formaPago: doc.formaPago,
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        valorVenta: doc.valorVenta,
        totalImpuestos: doc.totalImpuestos,
        subTotal: doc.subTotal,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
        note: {
            guias: [],
            codMotivo: '',
            desMotivo: '',
            numDocfectado: doc.numDoc,
            tipDocAfectado: doc.tipoDoc,
            parentID: doc._id
        }
    };
};
exports.InvoiceToNote = InvoiceToNote;
const DocumentToNote = async (id) => {
    let doc = await (0, search_1.SearchDocument)().ById(id);
    let document = {
        ublVersion: doc.ublVersion,
        tipoDoc: doc.tipoDoc,
        serie: doc.serie,
        correlativo: doc.correlativo.toString(),
        fechaEmision: (0, moment_1.default)(doc.fechaEmision).format(),
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        totalImpuestos: doc.totalImpuestos,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
        codMotivo: doc.note.codMotivo,
        desMotivo: doc.note.desMotivo,
        guias: [],
        numDocfectado: doc.note.numDocfectado,
        tipDocAfectado: doc.note.tipDocAfectado
    };
    return document;
};
exports.DocumentToNote = DocumentToNote;
const DocumentToVoidedNew = async (id, desMotivoBaja) => {
    let doc = await (0, search_1.SearchDocument)().ById(id);
    let document = {
        correlativo: (await (0, search_1.SearchVoided)().Correlative(doc)).toString(),
        fecGeneracion: (0, moment_1.default)(doc.fechaEmision).format(),
        fecComunicacion: (0, moment_1.default)(new Date()).format(),
        company: doc.company,
        details: [
            {
                tipoDoc: doc.tipoDoc,
                serie: doc.serie,
                correlativo: doc.correlativo,
                desMotivoBaja: desMotivoBaja
            }
        ]
    };
    return { document, doc };
};
exports.DocumentToVoidedNew = DocumentToVoidedNew;
const DocumentToVoided = async (id) => {
    let doc = await (0, search_1.SearchVoided)().ById(id);
    let document = {
        correlativo: doc.correlativo,
        fecGeneracion: doc.fecGeneracion,
        fecComunicacion: doc.fecGeneracion,
        company: doc.company,
        details: doc.details
    };
    return document;
};
exports.DocumentToVoided = DocumentToVoided;
//# sourceMappingURL=mapping.js.map