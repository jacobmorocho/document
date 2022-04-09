
import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()
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
const validate = ajv.compile(schema)

const IsValidate = (data) => {
    if (validate(data)) {

        return [true, data]
    } else {
        return [true, validate.errors]
    }
}
export { Detail, IsValidate }