"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfController = void 0;
const document_1 = require("../services/voucher/document");
const fs_1 = __importDefault(require("fs"));
const tmp_1 = __importDefault(require("tmp"));
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
            tmp_1.default.file(function (err, path, fd, cleanupCallback) {
                if (err)
                    throw err;
                console.log("path", path);
                (0, document_1.createInvoice)(invoice, path, () => {
                    const rs = fs_1.default.createReadStream(path);
                    res.setHeader("Content-Disposition", "attachment; invoice.pdf");
                    rs.pipe(res);
                    fs_1.default.unlink(path, function (err) {
                        if (err)
                            throw err;
                        console.log('File deleted!');
                    });
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    return {
        dowload: Dowload
    };
};
exports.pdfController = pdfController;
//# sourceMappingURL=pdfController.js.map