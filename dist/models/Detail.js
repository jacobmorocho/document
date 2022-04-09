"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidate = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const schema = {
    type: "object",
    properties: {
        codProducto: { type: "string" },
        unidad: { type: "string" },
        descripcion: { type: "string" },
        cantidad: { type: "number" },
        mtoValorUnitario: { type: "number" },
        mtoValorVenta: { type: "number" },
        mtoBaseIgv: { type: "number" },
        porcentajeIgv: { type: "number" },
        igv: { type: "number" },
        tipAfeIgv: { type: "number" },
        totalImpuestos: { type: "number" },
        mtoPrecioUnitario: { type: "number" }
    },
    required: ["codProducto", "unidad", "descripcion",
        "cantidad", "mtoValorUnitario", "mtoValorVenta", "mtoBaseIgv",
        "porcentajeIgv", "igv", "tipAfeIgv", "totalImpuestos", "mtoPrecioUnitario"],
    additionalProperties: false
};
const validate = ajv.compile(schema);
const IsValidate = (data) => {
    if (validate(data)) {
        return [true, data];
    }
    else {
        return [true, validate.errors];
    }
};
exports.IsValidate = IsValidate;
//# sourceMappingURL=Detail.js.map