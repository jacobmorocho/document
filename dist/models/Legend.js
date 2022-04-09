"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidate = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const schema = {
    type: "object",
    properties: {
        code: { type: "string" },
        value: { type: "string" },
    },
    required: ["code", "value"],
    additionalProperties: false
};
const validate = ajv.compile(schema);
const IsValidate = (data) => {
    if (validate(data)) {
        return [true, data];
    }
    else {
        return [true, validate.errors];
    }
};
exports.IsValidate = IsValidate;
//# sourceMappingURL=Legend.js.map