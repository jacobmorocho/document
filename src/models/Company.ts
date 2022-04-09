import { Address } from "./Address";
import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()
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
const validate = ajv.compile(schema)

const IsValidate = (data) => {
    if (validate(data)) {

        return [true, data]
    } else {
        return [true, validate.errors]
    }
}
export { Company, IsValidate }