import { createInvoice } from "../services/voucher/document";
import fs from 'fs';
import tmp from 'tmp';
const pdfController = () => {
    const Dowload = (req, res) => {
        const invoice = {
            shipping: {
                name: "John Doe",
                address: "1234 Main Street",
                city: "San Francisco",
                state: "CA",
                country: "US",
                postal_code: 94111
            },
            items: [
                {
                    item: "TC 100",
                    description: "Toner Cartridge",
                    quantity: 2,
                    amount: 6000
                },
                {
                    item: "USB_EXT",
                    description: "USB Cable Extender",
                    quantity: 1,
                    amount: 2000
                }
            ],
            subtotal: 8000,
            paid: 0,
            invoice_nr: 1234
        };


        try {

            tmp.file(function (err, path, fd, cleanupCallback) {
                if (err) throw err;
                console.log("path", path)
                createInvoice(invoice, path, () => {
                    const rs = fs.createReadStream(path);
                    res.setHeader("Content-Disposition", "attachment; invoice.pdf");
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
    return {
        dowload: Dowload
    }
}
export { pdfController }