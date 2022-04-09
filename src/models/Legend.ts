import { JSONSchemaType } from "ajv"


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


export { Legend, schema }