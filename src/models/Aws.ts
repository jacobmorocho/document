import { JSONSchemaType } from "ajv"
interface IDowloand {
    backet: string,
    name: string,
    key: string
}
const schema: JSONSchemaType<IDowloand> = {
    type: "object",
    properties: {
        backet: { type: "string" },
        name: { type: "string" },
        key: { type: "string" },
    },
    required: ["backet", "name", "key"],
}

export { IDowloand, schema }