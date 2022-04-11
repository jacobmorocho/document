
import Ajv from "ajv"
import { IDowloand, schema } from '../../models/Aws'
const ajv = new Ajv({ allErrors: true })
const awsvalidate = (model) => {
    let errors = [] as any;
    if (!ajv.validate(schema, model)) {
        errors.push(ajv.errors);
        return { status: false, errors };
    } else {
        return { status: true, model };
    }

}
export { awsvalidate }