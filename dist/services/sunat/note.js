"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const billing_1 = require("../../middlewares/billing");
const mapping_1 = require("./mapping");
const save_1 = require("../../services/mongo/save");
const search_1 = require("../../services/mongo/search");
const update_1 = require("../../services/mongo/update");
const Note = () => {
    const Create = async ({ serie, id, codMotivo, desMotivo }) => {
        let note = await (0, search_1.SearchDocument)().NoteByParent(id);
        if (note && note._id) {
            return note;
        }
        else {
            let doc = await (0, mapping_1.InvoiceToNote)(id);
            doc.serie = serie;
            doc.note.codMotivo = codMotivo;
            doc.note.desMotivo = desMotivo;
            return await (0, save_1.SaveDocument)(doc);
        }
    };
    const Send = async ({ serie, id, codMotivo, desMotivo }) => {
        try {
            let res = await (0, billing_1.Billing)().token();
            if (!res && !res.token) {
                return { status: false, message: "No tiene acceso" };
            }
            let note = await Create({ serie, id, codMotivo, desMotivo });
            if (note && note.status && note.status == false) {
                return note;
            }
            else {
                if (note && note._id) {
                    let doc = await (0, mapping_1.DocumentToNote)(note._id);
                    let data = await (0, billing_1.Billing)().note().Send(res.token, doc);
                    if (data && data.sunatResponse && data.sunatResponse.success) {
                        let document = await (0, search_1.SearchDocument)().ById(id);
                        document.estado = "ANULADO";
                        (0, update_1.DocumentUpdate)().Update({ _id: id, paylod: document }, (response) => {
                            return response;
                        });
                    }
                    return data.sunatResponse;
                }
                else {
                    return note;
                }
            }
        }
        catch (err) {
            return err;
        }
    };
    return {
        Send
    };
};
exports.Note = Note;
//# sourceMappingURL=note.js.map