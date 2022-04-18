import { Billing } from "../../middlewares/billing";
import { DocumentToNote, InvoiceToNote } from "./mapping";
import { SaveDocument } from "../../services/mongo/save";
import { SearchDocument } from "../../services/mongo/search";
import { DocumentUpdate } from "../../services/mongo/update";
const Note = () => {
    const Create = async ({ serie, id, codMotivo, desMotivo }): Promise<any> => {
        let note = await SearchDocument().NoteByParent(id);
        if (note && note._id) {
            return note;
        } else {
            let doc = await InvoiceToNote(id);
            doc.serie = serie;
            doc.note.codMotivo = codMotivo;
            doc.note.desMotivo = desMotivo;
            return await SaveDocument(doc);
        }

    }
    const Send = async ({ serie, id, codMotivo, desMotivo }): Promise<any> => {
        try {
            let res = await Billing().token();
            if (!res && !res.token) {
                return { status: false, message: "No tiene acceso" }
            }
            let note = await Create({ serie, id, codMotivo, desMotivo });

            if (note && note.status && note.status == false) {
                return note;
            } else {
                if (note && note._id) {
                    let doc = await DocumentToNote(note._id);
                    let data = await Billing().note().Send(res.token, doc);
                    if (data && data.sunatResponse && data.sunatResponse.success) {
                        let document = await SearchDocument().ById(id);
                        document.estado = "ANULADO"
                        DocumentUpdate().Update({ _id: id, paylod: document }, (response) => {
                            return response;
                        });
                    }
                    return data.sunatResponse;
                } else {
                    return note;
                }
            }
        } catch (err) {
            return err;
        }
    }
    return {
        Send
    }
}

export { Note }