import { VoidedModel } from "../../schema/voidedSchema";
import { DocumentModel } from "../../schema/documentSchema";
import { documentvalidate } from "../../services/validate/documentvalidate";
import { SearchDocument, SearchVoided } from "./search";
const SaveDocument = async (body) => {
    let response = documentvalidate(body);
    if (!response.status) {
        return response;
    } else {
        var document = new DocumentModel(body);
        document.correlativo = await SearchDocument().Correlative(document);
        document.numDoc = `${document.serie}-${document.correlativo}`;
        document.idDocument = `${document.company.ruc}-${document.serie}-${document.correlativo}`;
        document.estado="REGISTRO"
        return await document.save();
    }
}
const SaveVoided = async (body) => {
    var document = new VoidedModel(body.document);
    document.correlativo = await SearchVoided().Correlative(document);
    document.parentDocument = body.doc._id;
    document.idDocument = `${document.company.ruc}-${body.document.serie}-${document.correlativo}`;
    document.sunatResponse.success = false;
    document.sunatResponse.ticket = "";
    return await document.save();
}
export { SaveDocument, SaveVoided }