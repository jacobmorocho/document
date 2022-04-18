export interface IVoided {
    correlativo: string
    fecGeneracion: string
    fecComunicacion: string
    company: Company
    details: Detail[]
}

interface Company {
    ruc: string
    razonSocial: string
    nombreComercial: string
    address: Address
}

interface Address {
    direccion: string
    provincia: string
    departamento: string
    distrito: string
    ubigueo: string
}

interface Detail {
    tipoDoc: string
    serie: string
    correlativo: string
    desMotivoBaja: string
}
