import { DocumentModel } from "../../schema/documentSchema";

const Delete = async (id) => {
    try {
        const query = { _id: id };
        const database = await DocumentModel.deleteOne(query);
        return { status: true, data: database };
    } catch (error) {
        return { status: false, data: error };
    }
}

export { Delete }