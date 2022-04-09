
import { JSONSchemaType } from "ajv"
interface Detail {
    codProducto: string,
    unidad: string,
    descripcion: string,
    cantidad: number,
    mtoValorUnitario: number,
    mtoValorVenta: number,
    mtoBaseIgv: number,
    porcentajeIgv: number,
    igv: number,
    tipAfeIgv: number,
    totalImpuestos: number,
    mtoPrecioUnitario: number
}
const schema: JSONSchemaType<Detail> = {
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
}

export { Detail, schema }