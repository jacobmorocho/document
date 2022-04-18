"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlController = void 0;
const fs_1 = __importDefault(require("fs"));
const tmp_promise_1 = __importDefault(require("tmp-promise"));
const billing_1 = require("../middlewares/billing");
const mapping_1 = require("../services/sunat/mapping");
const xmlController = () => {
    const dowload = async (req, res) => {
        try {
            const id = req.params.id;
            let _res = await (0, billing_1.Billing)().token();
            if (!_res && !_res.token) {
                return { status: false, message: "No tiene acceso" };
            }
            let doc = await (0, mapping_1.DocumentToInvoice)(id);
            let _tmp = await tmp_promise_1.default.file();
            _tmp.cleanup();
            let data = await (0, billing_1.Billing)().invoice().Xml(_res.token, doc);
            fs_1.default.writeFile(_tmp.path, data, function (err) {
                if (err)
                    throw err;
                const rs = fs_1.default.createReadStream(_tmp.path);
                res.setHeader("Content-Disposition", `attachment; ${doc.serie}-${doc.correlativo}.xml`);
                rs.pipe(res);
                _tmp.cleanup();
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    return {
        dowload
    };
};
exports.xmlController = xmlController;
//# sourceMappingURL=xmlController.js.map