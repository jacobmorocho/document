import { Company } from "./Company"
import { Detail } from "./Detail"
import { FormaPago } from "./FormaPago"
import { Legend } from "./Legend"

interface Document {
    ublVersion: string,
    tipoOperacion: string,
    tipoDoc: string,
    serie: string,
    correlativo: string,
    fechaEmision: Date,
    formaPago: FormaPago,
    tipoMoneda: string,
    client: Company,
    company: Company,
    mtoOperGravadas: 100,
    mtoIGV: 18,
    valorVenta: 100,
    totalImpuestos: 18,
    subTotal: 118,
    mtoImpVenta: 118,
    details: Detail[],
    legends: Legend[]
}
export { Document }
