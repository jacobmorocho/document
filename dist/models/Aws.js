"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema = {
    type: "object",
    properties: {
        backet: { type: "string" },
        name: { type: "string" },
        key: { type: "string" },
    },
    required: ["backet", "name", "key"],
};
exports.schema = schema;
//# sourceMappingURL=Aws.js.map