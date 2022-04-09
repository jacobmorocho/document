import Ajv, { JSONSchemaType } from "ajv"
const ajv = new Ajv()

interface Legend {
    code: string,
    value: string
}
const schema: JSONSchemaType<Legend> = {
    type: "object",
    properties: {
        code: { type: "string" },
        value: { type: "string" },

    },
    required: ["code", "value"],
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
export { Legend, IsValidate }