"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CompanySchema = new Schema({
    ruc: String,
    razonSocial: String,
    nombreComercial: String,
    address: {
        direccion: String,
        provincia: String,
        departamento: String,
        distrito: String,
        ubigueo: String
    },
    tipePdf: {
        link: String,
        name: String
    },
    series: [],
    users: []
});
exports.CompanyModel = mongoose_1.default.model('Companys', CompanySchema);
//# sourceMappingURL=companySchema.js.map