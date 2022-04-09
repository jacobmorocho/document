import { Company } from "./Company"
import { Detail } from "./Detail"
import { FormaPago } from "./FormaPago"
import { Legend } from "./Legend"
import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()
interface Document {
    ublVersion: string,
    tipoOperacion: string,
    tipoDoc: string,
    serie: string,
    correlativo: string,
    fechaEmision: string,
    tipoMoneda: string,
    mtoOperGravadas: number,
    mtoIGV: number,
    valorVenta: number,
    totalImpuestos: number,
    subTotal: number,
    mtoImpVenta: number,
    formaPago: FormaPago,
    client: Company,
    company: Company,
    legends: any[],
    details: any[],

}
const schema: JSONSchemaType<Document> = {
    type: "object",
    properties: {
        ublVersion: { type: "string" },
        tipoOperacion: { type: "string" },
        tipoDoc: { type: "string" },
        serie: { type: "string" },
        correlativo: { type: "string" },
        fechaEmision: { type: "string" },
        tipoMoneda: { type: "string" },
        mtoOperGravadas: { type: "number" },
        mtoIGV: { type: "number" },
        valorVenta: { type: "number" },
        totalImpuestos: { type: "number" },
        subTotal: { type: "number" },
        mtoImpVenta: { type: "number" },
        client: { $ref: '#definitions/client' },
        company: { $ref: '#definitions/client' },
        formaPago: { $ref: '#definitions/formaPago' },
        legends: {
            type: 'array',
            items: {
                $ref: '#definitions/legend',
                type: "object"
            },
        },
        details: {
            type: 'array',
            items: {
                $ref: '#definitions/detail',
                type: "object"
            },
        },

    },
    required: ["ublVersion", "tipoOperacion", "tipoDoc"],
    definitions: {
        client: {
            type: 'object',
            properties: {
                ruc: { type: "string" },
                razonSocial: { type: "string" },
                nombreComercial: { type: "string" },
                address: { $ref: '#definitions/address' }
            },
            definitions: {
                address: {
                    type: 'object',
                    properties: {
                        direccion: { type: "string" },
                        provincia: { type: "string" },
                        departamento: { type: "string" },
                        distrito: { type: "string" },
                        ubigueo: { type: "string" },
                    },
                    required: [],
                },
            },
            required: [],
        },
        formaPago: {
            type: "object",
            properties: {
                moneda: { type: "string" },
                tipo: { type: "string" },

            },
            required: [],
        },
        detail: {
            type: 'object',
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
            required: [],
        },
        legend: {
            type: 'object',
            properties: {
                code: { type: "string" },
                value: { type: "string" },
            },
            required: [],
        }
    },
}
const validate = ajv.compile(schema)

const IsValidate = (data) => {
    if (validate(data)) {

        return [true, data]
    } else {
        return [true, validate.errors]
    }
}
export { Document, IsValidate }
