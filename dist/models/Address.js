"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const schema = {
    type: "object",
    properties: {
        direccion: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        provincia: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        departamento: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        distrito: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 1000 }
            ]
        },
        ubigueo: {
            type: "string", allOf: [
                { "minLength": 3 },
                { "maxLength": 20 }
            ]
        },
    },
    required: ["direccion", "provincia", "departamento", "distrito", "ubigueo"],
};
exports.schema = schema;
const validate = ajv.compile(schema);
//# sourceMappingURL=Address.js.map