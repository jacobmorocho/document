"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voided = void 0;
const update_1 = require("../../services/mongo/update");
const billing_1 = require("../../middlewares/billing");
const save_1 = require("../../services/mongo/save");
const mapping_1 = require("./mapping");
const search_1 = require("../../services/mongo/search");
const Voided = () => {
    const Create = async ({ id, desMotivoBaja }) => {
        let note = await (0, search_1.SearchVoided)().ByParent(id);
        if (note && note._id) {
            return note;
        }
        else {
            let doc = await (0, mapping_1.DocumetToVoided)(id, desMotivoBaja);
            return await (0, save_1.SaveVoided)(doc);
        }
    };
    const Send = async ({ id, desMotivoBaja }) => {
        let res = await (0, billing_1.Billing)().token();
        if (!res && !res.token) {
            return { status: false, message: "No tiene acceso" };
        }
        let voided = await Create({ id, desMotivoBaja });
        if (voided && voided.status && voided.status == false) {
            return voided;
        }
        else {
            if (voided && voided._id) {
                let doc = await (0, mapping_1.DocumentToVoided)(voided._id);
                let data = await (0, billing_1.Billing)().voided().Send(res.token, doc);
                if (data && data.sunatResponse) {
                    let doc = await (0, search_1.SearchVoided)().ById(voided._id);
                    doc.sunatResponse = data.sunatResponse;
                    (0, update_1.VoidedUpdate)().Update({ _id: voided._id, paylod: doc }, () => {
                        return data.sunatResponse;
                    });
                    let document = await (0, search_1.SearchDocument)().ById(id);
                    document.estado = "BAJA";
                    (0, update_1.DocumentUpdate)().Update({ _id: id, paylod: document }, (response) => {
                        return response;
                    });
                }
                return data.sunatResponse;
            }
            else {
                return voided;
            }
        }
    };
    return {
        Send
    };
};
exports.Voided = Voided;
//# sourceMappingURL=voided.js.map