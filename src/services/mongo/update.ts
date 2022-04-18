import { documentvalidate } from "../../services/validate/documentvalidate";
import { DocumentModel } from "../../schema/documentSchema";
import { VoidedModel } from "../../schema/voidedSchema";
const DocumentUpdate = () => {
    const Update = ({ _id, paylod }, callback) => {
        let response = documentvalidate(paylod);
        if (!response.status) {
            callback(response);
        } else {
            DocumentModel.findByIdAndUpdate(_id, paylod, callback)
        }
    }
    return { Update }
}
const VoidedUpdate = () => {
    const Update = ({ _id, paylod }, callback) => {
        VoidedModel.findByIdAndUpdate(_id, paylod, callback)
    }
    return { Update }
}

export { DocumentUpdate, VoidedUpdate }