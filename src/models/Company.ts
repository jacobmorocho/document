import { Address } from "./Address";
import { JSONSchemaType } from "ajv"

interface Company {
    ruc: string,
    razonSocial: string,
    nombreComercial: string,
    address: Address
}
const schema: JSONSchemaType<Company> = {
    type: "object",
    properties: {
        ruc: { type: "string" },
        razonSocial: { type: "string" },
        nombreComercial: { type: "string" },
        address: { $ref: '#definitions/address' },
    },
    required: ["ruc", "razonSocial", "nombreComercial"],
    definitions: {
        address: {
            type: 'object',
            "$id": '#definitions/address',
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
}



export { Company, schema }