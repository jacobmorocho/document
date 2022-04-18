interface Inote {
    ublVersion: string
    tipoDoc: string
    serie: string
    correlativo: string
    fechaEmision: string
    tipDocAfectado: string
    numDocfectado: string
    codMotivo: string
    desMotivo: string
    tipoMoneda: string
    guias: Guia[]
    client: Client
    company: Company
    mtoOperGravadas: number
    mtoIGV: number
    totalImpuestos: number
    mtoImpVenta: number
    details: Detail[]
    legends: Legend[]
}

interface Guia {
    tipoDoc: string
    nroDoc: string
}

interface Client {
    tipoDoc: string
    numDoc: number
    rznSocial: string
    address: Address
}

interface Address {
    direccion: string
    provincia: string
    departamento: string
    distrito: string
    ubigueo: string
}

interface Company {
    ruc: number
    razonSocial: string
    nombreComercial: string
    address: Address2
}

interface Address2 {
    direccion: string
    provincia: string
    departamento: string
    distrito: string
    ubigueo: string
}

interface Detail {
    codProducto: string
    unidad: string
    cantidad: number
    descripcion: string
    mtoBaseIgv: number
    porcentajeIgv: number
    igv: number
    tipAfeIgv: number
    totalImpuestos: number
    mtoValorVenta: number
    mtoValorUnitario: number
    mtoPrecioUnitario: number
}

interface Legend {
    code: string
    value: string
}

export { Inote }