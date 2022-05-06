import { Company } from "./Company"
import { FormaPago } from "./FormaPago"
import { JSONSchemaType } from "ajv"
import { Cliente } from "./Client"
interface Document {
    ublVersion: string,
    tipoOperacion: string,
    tipoDoc: string,
    idDocument: string,
    serie: string,
    correlativo: number,
    fechaEmision: string,
    tipoMoneda: string,
    mtoOperGravadas: number,
    mtoIGV: number,
    valorVenta: number,
    totalImpuestos: number,
    totaDescuento: number,
    subTotal: number,
    mtoImpVenta: number,
    observacion: string,
    analitica: string,
    formaPago: FormaPago,
    client: Cliente,
    company: Company,
    legends: any[],
    details: any[],

}
const schema: JSONSchemaType<Document> = {
    definitions: {
        client: {
            type: 'object',
            "$id": "#definitions/client",
            properties: {
                numDoc: {
                    type: "string",
                    allOf: [
                        { "minLength": 8 },
                        { "maxLength": 11 }
                    ]
                },
                razonSocial: { type: "string", },
                tipoDoc: { type: "string" },
                address: { $ref: '#definitions/address1' }
            },
            definitions: {
                address: {
                    type: 'object',
                    "$id": "#definitions/address1",
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
        company: {
            type: 'object',
            "$id": "#definitions/company",
            properties: {
                ruc: { type: "string" },
                razonSocial: { type: "string" },
                nombreComercial: { type: "string" },
                address: { $ref: '#definitions/address2' }
            },
            definitions: {
                address: {
                    type: 'object',
                    "$id": "#definitions/address2",
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
            "$id": "#definitions/formaPago",
            properties: {
                moneda: { type: "string" },
                tipo: { type: "string" },

            },
            required: [],
        },
        detail: {
            type: 'object',
            "$id": "#definitions/detail",
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
            "$id": "#definitions/legend",
            properties: {
                code: { type: "string" },
                value: { type: "string" },
            },
            required: [],
        }
    },
    type: "object",
    properties: {
        idDocument: {
            type: "string",
        },
        ublVersion: {
            type: "string",
            allOf: [
                { "minLength": 1 },
                { "maxLength": 3 }
            ]
        },
        tipoOperacion: {
            type: "string",
            allOf: [
                { "minLength": 2 },
                { "maxLength": 4 }
            ]
        },
        tipoDoc: {
            type: "string",
            allOf: [
                { "minLength": 2 },
                { "maxLength": 2 }
            ]
        },
        serie: {
            type: "string",
            allOf: [
                { "minLength": 4 },
                { "maxLength": 4 }
            ]
        },
        correlativo: {
            type: "number", "minimum": 0
        },
        fechaEmision: {
            type: "string",
            allOf: [
                { "minLength": 5 },
                { "maxLength": 30 }
            ]
        },
        tipoMoneda: {
            type: "string",
            allOf: [
                { "minLength": 2 },
                { "maxLength": 3 }
            ]
        },
        mtoOperGravadas: { type: "number", "minimum": 0, },
        mtoIGV: { type: "number", "minimum": 0, },
        valorVenta: { type: "number", "minimum": 0, },
        totalImpuestos: { type: "number", "minimum": 0, },
        subTotal: { type: "number", "minimum": 0, },
        mtoImpVenta: { type: "number", "minimum": 0, },
        totaDescuento: { type: "number", "minimum": 0, },
        formaPago: { $ref: '#definitions/formaPago' },
        client: { $ref: '#definitions/client' },
        company: { $ref: '#definitions/company' },
        observacion: {
            type: "string",
        },
        analitica: {
            type: "string",
            allOf: [
                { "minLength": 2 },
                { "maxLength": 100 }
            ]
        },
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
    required: ["ublVersion", "tipoOperacion", "tipoDoc", "serie",
        "fechaEmision", "tipoMoneda", "mtoOperGravadas", "mtoIGV", "valorVenta", "totalImpuestos",
        "subTotal", "mtoImpVenta", "formaPago", "client", "company", "legends", "details"]
}
export { Document, schema }
