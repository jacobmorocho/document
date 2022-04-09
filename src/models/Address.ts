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
        direccion: { type: "string" },
        provincia: { type: "string" },
        departamento: { type: "string" },
        distrito: { type: "string" },
        ubigueo: { type: "string" },
    },
    required: ["direccion", "provincia", "departamento", "distrito", "ubigueo"],
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
export { Address, IsValidate }