"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema = {
    type: "object",
    properties: {
        code: { type: "string" },
        value: { type: "string" },
    },
    required: ["code", "value"],
    additionalProperties: false
};
exports.schema = schema;
//# sourceMappingURL=Legend.js.map