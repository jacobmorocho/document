import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()
interface Address {
    direccion: string,
    provincia: string,
    departamento: string,
    distrito: string,
    ubigueo: string
}
const schema: JSONSchemaType<Address> = {
    type: "object",
    properties: {
        direccion: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        provincia: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        departamento: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        distrito: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        ubigueo: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 20 }
            ]
        },
    },
    required: ["direccion", "provincia", "departamento", "distrito", "ubigueo"],
}
const validate = ajv.compile(schema)


export { Address, schema }