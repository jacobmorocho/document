"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfController = void 0;
const document_1 = require("../services/voucher/document");
const fs_1 = __importDefault(require("fs"));
const tmp_1 = __importDefault(require("tmp"));
const ticket_1 = require("../services/voucher/ticket");
const pdfController = () => {
    const Voucher = (req, res) => {
        try {
            const { id: _id } = req.params;
            tmp_1.default.file(function (err, path, fd, cleanupCallback) {
                if (err)
                    throw err;
                (0, document_1.createdocument)(_id, path, (numDoc) => {
                    const rs = fs_1.default.createReadStream(path);
                    res.setHeader("Content-Disposition", `attachment; ${numDoc}.pdf`);
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
    const Ticket = (req, res) => {
        tmp_1.default.file(function (err, path, fd, cleanupCallback) {
            if (err)
                throw err;
            (0, ticket_1.createTicket)(req.params.id, path, (numDoc) => {
                const rs = fs_1.default.createReadStream(path);
                res.setHeader("Content-Disposition", `attachment; ${numDoc}.pdf`);
                rs.pipe(res);
                fs_1.default.unlink(path, function (err) {
                    if (err)
                        throw err;
                    console.log('File deleted!');
                });
            });
        });
    };
    return {
        voucher: Voucher,
        ticket: Ticket
    };
};
exports.pdfController = pdfController;
//# sourceMappingURL=pdfController.js.map