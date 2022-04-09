import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()

interface FormaPago {
    moneda: string,
    tipo: string
}
const schema: JSONSchemaType<FormaPago> = {
    type: "object",
    properties: {
        moneda: { type: "string" },
        tipo: { type: "string" },

    },
    required: ["moneda", "tipo"],
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
export { FormaPago, IsValidate }