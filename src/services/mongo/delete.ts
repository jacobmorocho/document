import { CompetitionModel } from "../../schema/documentSchema";

const Delete = async (id) => {
    try {
        const query = { _id: id };
        const database = await CompetitionModel.deleteOne(query);
        return { status: true, data: database };
    } catch (error) {
        return { status: false, data: error };
    }
}

export { Delete }