import { CompetitionModel } from "../../schema/documentSchema";

const Update = ({ _id, paylod }, callback) => {
    CompetitionModel.findByIdAndUpdate(_id, paylod, callback)
}
export { Update }