"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema = {
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
            "$id": '#definitions/address',
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
};
exports.schema = schema;
//# sourceMappingURL=Company.js.map