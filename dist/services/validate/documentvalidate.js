"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentvalidate = void 0;
const Document = __importStar(require("../../models/Document"));
const Company = __importStar(require("../../models/Company"));
const Adress = __importStar(require("../../models/Address"));
const Legend = __importStar(require("../../models/Legend"));
const Detail = __importStar(require("../../models/Detail"));
const Client = __importStar(require("../../models/Client"));
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default({ allErrors: true });
const documentvalidate = (schema) => {
    let errors = [];
    if (!ajv.validate(Document.schema, schema)) {
        errors.push(ajv.errors);
    }
    /*company*/
    if (!ajv.validate(Company.schema, schema.company)) {
        errors.push({ "entity": "Company", errors: ajv.errors });
    }
    if (!ajv.validate(Adress.schema, schema.company.address)) {
        errors.push({ "entity": "Company.Adress", errors: ajv.errors });
    }
    /*client*/
    if (!ajv.validate(Client.schema, schema.client)) {
        errors.push({ "entity": "client", errors: ajv.errors });
    }
    if (!ajv.validate(Adress.schema, schema.client.address)) {
        errors.push({ "entity": "client.Adress", errors: ajv.errors });
    }
    /*Legend*/
    schema.legends.map((legend) => {
        if (!ajv.validate(Legend.schema, legend)) {
            errors.push(ajv.errors);
        }
    });
    /*details*/
    schema.details.map((detail, index) => {
        if (!ajv.validate(Detail.schema, detail)) {
            errors.push({ "entity": `Detail.Item(${index})`, errors: ajv.errors });
        }
    });
    return { status: errors.length <= 0, errors };
};
exports.documentvalidate = documentvalidate;
//# sourceMappingURL=documentvalidate.js.map