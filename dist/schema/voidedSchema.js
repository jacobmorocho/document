"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoidedModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const VoidedSchema = new Schema({
    parentDocument: {
        type: String,
        unique: true
    },
    serie: String,
    correlativo: Number,
    fecGeneracion: String,
    fecComunicacion: String,
    company: {
        ruc: String,
        razonSocial: String,
        nombreComercial: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String,
        }
    },
    sunatResponse: {
        success: Boolean,
        ticket: String
    },
    details: []
});
exports.VoidedModel = mongoose_1.default.model('Voideds', VoidedSchema);
//# sourceMappingURL=voidedSchema.js.map