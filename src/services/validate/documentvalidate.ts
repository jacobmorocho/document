
import * as Document from '../../models/Document';
import * as Company from '../../models/Company';
import * as Adress from '../../models/Address';
import * as Legend from '../../models/Legend';
import * as Detail from '../../models/Detail';
import * as Client from '../../models/Client';
import Ajv from "ajv"
const ajv = new Ajv({ allErrors: true })

const documentvalidate = (schema) => {
    let errors = [] as any;
    if (!ajv.validate(Document.schema, schema)) {
        errors.push(ajv.errors)
    }
    /*company*/
    if (!ajv.validate(Company.schema, schema.company)) {
        errors.push({ "entity": "Company", errors: ajv.errors })
    }
    if (!ajv.validate(Adress.schema, schema.company.address)) {
        errors.push({ "entity": "Company.Adress", errors: ajv.errors })
    }
    /*client*/
    if (!ajv.validate(Client.schema, schema.client)) {
        errors.push({ "entity": "client", errors: ajv.errors })
    }
    if (!ajv.validate(Adress.schema, schema.client.address)) {
        errors.push({ "entity": "client.Adress", errors: ajv.errors })
    }
    /*Legend*/
    schema.legends.map((legend) => {
        if (!ajv.validate(Legend.schema, legend)) {
            errors.push(ajv.errors)
        }
    });
    /*details*/
    schema.details.map((detail, index) => {
        if (!ajv.validate(Detail.schema, detail)) {
            errors.push({ "entity": `Detail.Item(${index})`, errors: ajv.errors })
        }
    });
    return { status: errors.length <= 0, errors };
}
const companyvalidate=(schema)=>{
    console.log(schema);
    let errors = [] as any;
    /*company*/
    if (!ajv.validate(Company.schema, schema)) {
        errors.push({ "entity": "Company", errors: ajv.errors })
    }
    if (!ajv.validate(Adress.schema, schema.address)) {
        errors.push({ "entity": "Company.Adress", errors: ajv.errors })
    }
    return { status: errors.length <= 0, errors };
}
export { documentvalidate,companyvalidate }