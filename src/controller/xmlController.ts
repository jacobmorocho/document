import fs from 'fs';
import { SearchDocument } from '../services/mongo/search';
import tmp from 'tmp-promise';
import { Billing } from '../middlewares/billing';
import { DocumentToInvoice } from '../services/sunat/mapping';

const xmlController = () => {
    const dowload = async (req, res) => {
        try {
            const id = req.params.id;
            let _res = await Billing().token();
            if (!_res && !_res.token) {
                return { status: false, message: "No tiene acceso" }
            }
            let doc = await DocumentToInvoice(id);
            let _tmp = await tmp.file();
            _tmp.cleanup();
            let data = await Billing().invoice().Xml(_res.token, doc);
            fs.writeFile(_tmp.path, data, function (err) {
                if (err) throw err;
                const rs = fs.createReadStream(_tmp.path);
                res.setHeader("Content-Disposition", `attachment; ${doc.serie}-${doc.correlativo}.xml`);
                rs.pipe(res);
                _tmp.cleanup();
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    return {
        dowload
    }
}
export { xmlController }