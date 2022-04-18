"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingController = void 0;
const note_1 = require("../services/sunat/note");
const invoice_1 = require("../services/sunat/invoice");
const voided_1 = require("../services/sunat/voided");
const billingController = () => {
    const InvoiceSunat = () => {
        const Send = async (req, res) => {
            let response = await (0, invoice_1.Invoice)().Send(req.params.id);
            res.json(response);
        };
        return {
            Send
        };
    };
    const NoteSunat = () => {
        const Send = async (req, res) => {
            let response = await (0, note_1.Note)().Send(req.body);
            res.json(response);
        };
        return {
            Send
        };
    };
    const VoidedSunat = () => {
        const Send = async (req, res) => {
            let response = await (0, voided_1.Voided)().Send(req.body);
            res.json(response);
        };
        return {
            Send
        };
    };
    return {
        Invoice: InvoiceSunat,
        Note: NoteSunat,
        Voided: VoidedSunat
    };
};
exports.billingController = billingController;
//# sourceMappingURL=billingController.js.map