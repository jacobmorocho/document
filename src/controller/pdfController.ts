import { createdocument } from "../services/voucher/document";
import fs from 'fs';
import tmp from 'tmp';
import { createTicket } from "../services/voucher/ticket";
const pdfController = () => {

    const Voucher = (req, res) => {
        try {
            const { id: _id } = req.params;
            tmp.file(function (err, path, fd, cleanupCallback) {
                if (err) throw err;
                createdocument(_id, path, (numDoc) => {
                    const rs = fs.createReadStream(path);
                    res.setHeader("Content-Disposition", `attachment; ${numDoc}.pdf`);
                    rs.pipe(res);
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    const Ticket = (req, res) => {
        tmp.file(function (err, path, fd, cleanupCallback) {
            if (err) throw err;
            createTicket(req.params.id, path, (numDoc) => {
                const rs = fs.createReadStream(path);
                res.setHeader("Content-Disposition", `attachment; ${numDoc}.pdf`);
                rs.pipe(res);
                fs.unlink(path, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });
            })
        });
    }
    return {
        voucher: Voucher,
        ticket: Ticket
    }
}
export { pdfController }