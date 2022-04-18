import { SearchDocument, SearchVoided } from "../../services/mongo/search";
import { IInvoice } from "../../models/Invoice"
import moment from "moment";
import { Inote } from "../../models/Note";
import { IVoided } from "../../models/Voided";

const DocumentToInvoice = async (id: any): Promise<IInvoice> => {
    let doc = await SearchDocument().ById(id);
    return {
        ublVersion: doc.ublVersion,
        tipoOperacion: doc.tipoOperacion,
        tipoDoc: doc.tipoDoc,
        serie: doc.serie,
        correlativo: doc.correlativo.toString(),
        fechaEmision: moment(doc.fechaEmision).format(),
        formaPago: doc.formaPago,
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        valorVenta: doc.valorVenta,
        totalImpuestos: doc.totalImpuestos,
        subTotal: doc.subTotal,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
    }
}
const InvoiceToNote = async (id: any): Promise<any> => {
    let doc = await SearchDocument().ById(id);

    return {
        numDoc: "",
        ublVersion: doc.ublVersion,
        tipoOperacion: doc.tipoOperacion,
        tipoDoc: "07",
        serie: "",
        correlativo: 1,
        fechaEmision: moment(new Date()).format().toString(),
        formaPago: doc.formaPago,
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        valorVenta: doc.valorVenta,
        totalImpuestos: doc.totalImpuestos,
        subTotal: doc.subTotal,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
        note: {
            guias: [],
            codMotivo: '',
            desMotivo: '',
            numDocfectado: doc.numDoc,
            tipDocAfectado: doc.tipoDoc,
            parentID: doc._id
        }
    }
}
const DocumentToNote = async (id: any): Promise<Inote> => {
    let doc = await SearchDocument().ById(id);
    let document: Inote = {
        ublVersion: doc.ublVersion,
        tipoDoc: doc.tipoDoc,
        serie: doc.serie,
        correlativo: doc.correlativo.toString(),
        fechaEmision: moment(doc.fechaEmision).format(),
        tipoMoneda: doc.tipoMoneda,
        client: doc.client,
        company: doc.company,
        mtoOperGravadas: doc.mtoOperGravadas,
        mtoIGV: doc.mtoIGV,
        totalImpuestos: doc.totalImpuestos,
        mtoImpVenta: doc.mtoImpVenta,
        details: doc.details,
        legends: doc.legends,
        codMotivo: doc.note.codMotivo,
        desMotivo: doc.note.desMotivo,
        guias: [],
        numDocfectado: doc.note.numDocfectado,
        tipDocAfectado: doc.note.tipDocAfectado
    }
    return document;
}
const DocumetToVoided = async (id: any, desMotivoBaja): Promise<any> => {
    let doc = await SearchDocument().ById(id);
    let document: IVoided = {
        correlativo: (await SearchVoided().Correlative(doc)).toString(),
        fecGeneracion: moment(doc.fechaEmision).format(),
        fecComunicacion: moment(new Date()).format(),
        company: doc.company,
        details: [
            {
                tipoDoc: doc.tipoDoc,
                serie: doc.serie,
                correlativo: doc.correlativo,
                desMotivoBaja: desMotivoBaja
            }
        ]
    }
    return { document, doc };
}
const DocumentToVoided = async (id) => {
    let doc = await SearchVoided().ById(id);
 
    let document: IVoided = {
        correlativo: doc.correlativo,
        fecGeneracion: doc.fecGeneracion,
        fecComunicacion: doc.fecGeneracion,
        company: doc.company,
        details: doc.details
    }
    return document;
}
export { DocumentToInvoice, InvoiceToNote, DocumentToNote, DocumetToVoided, DocumentToVoided }