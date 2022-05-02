"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DocumentSchema = new Schema({
    numDoc: String,
    ublVersion: String,
    tipoOperacion: String,
    tipoDoc: String,
    serie: String,
    idDocument: {
        type: String,
        unique: true
    },
    correlativo: Number,
    fechaEmision: Date,
    tipoMoneda: String,
    mtoOperGravadas: Number,
    mtoIGV: Number,
    valorVenta: Number,
    totalImpuestos: Number,
    totaDescuento: Number,
    subTotal: Number,
    mtoImpVenta: Number,
    estado: String,
    formaPago: {
        moneda: String,
        tipo: String
    },
    client: {
        numDoc: String,
        rznSocial: String,
        tipoDoc: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String
        }
    },
    company: {
        ruc: String,
        razonSocial: String,
        nombreComercial: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String
        }
    },
    legends: [],
    details: [],
    note: {
        guias: [],
        codMotivo: String,
        desMotivo: String,
        numDocfectado: String,
        tipDocAfectado: String,
        parentID: String
    }
});
exports.DocumentModel = mongoose_1.default.model('Documents', DocumentSchema);
//# sourceMappingURL=documentSchema.js.map