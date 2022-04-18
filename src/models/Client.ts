import { Address } from "./Address";
import { JSONSchemaType } from "ajv"

interface Cliente {
    numDoc: string,
    rznSocial: string,
    tipoDoc: string,
    address: Address
}
const schema: JSONSchemaType<Cliente> = {
    type: "object",
    properties: {
        numDoc: { type: "string" },
        rznSocial: { type: "string" },
        tipoDoc: { type: "string" },
        address: { $ref: '#definitions/address' },
    },
    required: ["numDoc", "rznSocial", "tipoDoc"],
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



export { Cliente, schema }