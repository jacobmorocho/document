import { documentvalidate } from "../../services/validate/documentvalidate";
import { CompetitionModel } from "../../schema/documentSchema";

const Update = ({ _id, paylod }, callback) => {
    let response = documentvalidate(paylod);
    if (!response.status) {
        callback(response, null);
    } else {
        CompetitionModel.findByIdAndUpdate(_id, paylod, callback)
    }

}
export { Update }