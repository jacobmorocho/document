import { Address } from "./Address";

interface Company {
    ruc: string,
    razonSocial: string,
    nombreComercial: string,
    address: Address
}

export { Company }