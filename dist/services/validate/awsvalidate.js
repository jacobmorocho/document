"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsvalidate = void 0;
const ajv_1 = __importDefault(require("ajv"));
const Aws_1 = require("../../models/Aws");
const ajv = new ajv_1.default({ allErrors: true });
const awsvalidate = (model) => {
    let errors = [];
    if (!ajv.validate(Aws_1.schema, model)) {
        errors.push(ajv.errors);
        return { status: false, errors };
    }
    else {
        return { status: true, model };
    }
};
exports.awsvalidate = awsvalidate;
//# sourceMappingURL=awsvalidate.js.map