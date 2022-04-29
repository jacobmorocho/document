import { DocumentUpdate, VoidedUpdate } from "../../services/mongo/update";
import { Billing } from "../../middlewares/billing";
import { SaveVoided } from "../../services/mongo/save";
import { DocumentToVoided, DocumentToVoidedNew } from "./mapping"
import { SearchDocument, SearchVoided } from "../../services/mongo/search";

const Voided = () => {
    const Create = async ({ id, desMotivoBaja }) => {
        let voided = await SearchVoided().ByParent(id);
        if (voided && voided._id) {
            return voided;
        } else {
            let doc = await DocumentToVoidedNew(id, desMotivoBaja);
            return await SaveVoided(doc);
        }
    }
    const Send = async ({ id, desMotivoBaja }) => {
        let res = await Billing().token();
        if (!res && !res.token) {
            return { status: false, message: "No tiene acceso" }
        }
        let voided = await Create({ id, desMotivoBaja });
        if (voided && voided.status && voided.status == false) {
            return voided;
        } else {
            if (voided && voided._id) {
                let doc = await DocumentToVoided(voided._id);
                let data = await Billing().voided().Send(res.token, doc);
                if (data && data.sunatResponse) {
                    let doc = await SearchVoided().ById(voided._id);
                    doc.sunatResponse = data.sunatResponse;
                    VoidedUpdate().Update({ _id: voided._id, paylod: doc }, () => {
                        return data.sunatResponse;
                    });
                    let document = await SearchDocument().ById(id);
                    document.estado = "BAJA"
                    DocumentUpdate().Update({ _id: id, paylod: document }, (response) => {
                        return response;
                    });
                }
                return data.sunatResponse;
            } else {
                return voided;
            }
        }
    }
    return {
        Send
    }
}
export { Voided }
