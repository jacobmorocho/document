"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
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
        mtoPrecioUnitario: { type: "number" },
        mtoDescuento: { type: "number" },
        observacion: { type: "string" }
    },
    required: ["codProducto", "unidad", "descripcion",
        "cantidad", "mtoValorUnitario", "mtoValorVenta", "mtoBaseIgv",
        "porcentajeIgv", "igv", "tipAfeIgv", "totalImpuestos", "mtoPrecioUnitario"],
    additionalProperties: false
};
exports.schema = schema;
//# sourceMappingURL=Detail.js.map