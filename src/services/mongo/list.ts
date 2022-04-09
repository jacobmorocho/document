import { CompetitionModel } from "../../schema/documentSchema";

const ListDocuents = async (param) => {
    try {
        const database = await CompetitionModel.find();
        return { status: true, data: database };
    } catch (error) {
        return { status: false, data: error };
    }
}

export {ListDocuents}