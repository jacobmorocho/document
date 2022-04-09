"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetitionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const DocumentSchema = new Schema({
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
    subTotal: Number,
    mtoImpVenta: Number,
    formaPago: {
        moneda: String,
        tipo: String
    },
    client: {
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
});
exports.CompetitionModel = mongoose_1.default.model('Documents', DocumentSchema);
//# sourceMappingURL=documentSchema.js.map