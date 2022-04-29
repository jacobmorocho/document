
import { SearchDocument } from "../../services/mongo/search";
import { Billing } from "../../middlewares/billing";
import { DocumentToInvoice } from "./mapping";
import { DocumentUpdate } from "../../services/mongo/update";
const Invoice = () => {
    const Send = async (id) => {
        try {
            let res = await Billing().token();
            let doc = await DocumentToInvoice(id);
            let data = await Billing().invoice().Send(res.token, doc);
            if (data && data.sunatResponse && data.sunatResponse.success) {
                let document = await SearchDocument().ById(id);
                document.estado = "ENVIADO"              
                DocumentUpdate().Update({ _id: id, paylod: document }, (response) => {
                    console.log(response)
                })
            } 
            return data.sunatResponse;
        } catch (err) {
            return err;
        }
    }
    return {
        Send
    }
}

export { Invoice }