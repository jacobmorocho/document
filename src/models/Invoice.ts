 interface IInvoice {
    ublVersion: string
    tipoOperacion: string
    tipoDoc: string
    serie: string
    correlativo: string
    fechaEmision: string
    formaPago: IFormaPago
    tipoMoneda: string
    client: IClient
    company: ICompany
    mtoOperGravadas: number
    mtoIGV: number
    valorVenta: number
    totalImpuestos: number
    subTotal: number
    mtoImpVenta: number
    details: IDetail[]
    legends: ILegend[]
}

interface IFormaPago {
    moneda: string
    tipo: string
}
interface IClient {
    tipoDoc: string
    numDoc: number
    rznSocial: string
    address: IAddress
}
interface IAddress {
    direccion: string
    provincia: string
    departamento: string
    distrito: string
    ubigueo: string
}
interface ICompany {
    ruc: number
    razonSocial: string
    nombreComercial: string
    address: IAddress
}
interface IDetail {
    codProducto: string
    unidad: string
    descripcion: string
    cantidad: number
    mtoValorUnitario: number
    mtoValorVenta: number
    mtoBaseIgv: number
    porcentajeIgv: number
    igv: number
    tipAfeIgv: number
    totalImpuestos: number
    mtoPrecioUnitario: number
}
interface ILegend {
    code: string
    value: string
}

export {IInvoice}