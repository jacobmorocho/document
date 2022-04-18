import { Note } from "../services/sunat/note";
import { Invoice } from "../services/sunat/invoice";
import { Voided } from "../services/sunat/voided";


const billingController = () => {
    const InvoiceSunat = () => {
        const Send = async (req, res) => {
            let response = await Invoice().Send(req.params.id);
            res.json(response);
        }
        return {
            Send
        }
    }
    const NoteSunat = () => {
        const Send = async (req, res) => {
            let response = await Note().Send(req.body);
            res.json(response);
        }
        return {
            Send
        }
    }
    const VoidedSunat = () => {
        const Send = async (req, res) => {
            let response = await Voided().Send(req.body);
            res.json(response);
        }
        return {
            Send
        }
    }
    return {
        Invoice: InvoiceSunat,
        Note: NoteSunat,
        Voided: VoidedSunat
    }
}
export { billingController }