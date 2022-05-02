"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const search_1 = require("../../services/mongo/search");
const billing_1 = require("../../middlewares/billing");
const mapping_1 = require("./mapping");
const update_1 = require("../../services/mongo/update");
const Invoice = () => {
    const Send = async (id) => {
        try {
            let res = await (0, billing_1.Billing)().token();
            let doc = await (0, mapping_1.DocumentToInvoice)(id);
            let data = await (0, billing_1.Billing)().invoice().Send(res.token, doc);
            if (data && data.sunatResponse && data.sunatResponse.success) {
                let document = await (0, search_1.SearchDocument)().ById(id);
                document.estado = "ENVIADO";
                (0, update_1.DocumentUpdate)().Update({ _id: id, paylod: document }, (response) => {
                    console.log(response);
                });
            }
            return data.sunatResponse;
        }
        catch (err) {
            return err;
        }
    };
    return {
        Send
    };
};
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.js.map