import { VoidedModel } from "../../schema/voidedSchema";
import { DocumentModel } from "../../schema/documentSchema";
import { companyvalidate, documentvalidate } from "../../services/validate/documentvalidate";
import { SearchDocument, SearchVoided } from "./search";
import { CompanyModel } from "../../schema/companySchema";
const SaveDocument = async (body): Promise<any> => {
    let response = documentvalidate(body);
    if (!response.status) {
        return response;
    } else {
        console.log(body)
        var document = new DocumentModel(body);
        document.correlativo = await SearchDocument().Correlative(document);
        document.numDoc = `${document.serie}-${document.correlativo}`;
        document.idDocument = `${document.company.ruc}-${document.serie}-${document.correlativo}`;
        document.estado = "REGISTRO"
        let data = await document.save();
        return { status: true, data }
    }
}
const SaveVoided = async (body) => {
    var document = new VoidedModel(body.document);
    document.correlativo = await SearchVoided().Correlative(document);
    document.parentDocument = body.doc._id;
    document.idDocument = `${document.company.ruc}-${body.document.serie}-${document.correlativo}`;
    document.sunatResponse.success = false;
    document.sunatResponse.ticket = "";
    document.parent = body.doc;
    return await document.save();
}
const SaveCompany = async (body) => {

    let response = companyvalidate(body);
    if (!response.status) {
        return response;
    } else {
        var campany = new CompanyModel(body);
        return await campany.save();
    }
}
export { SaveDocument, SaveVoided, SaveCompany }