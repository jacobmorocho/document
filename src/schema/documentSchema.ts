import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    ublVersion: String,
    tipoOperacion: String,
    tipoDoc: String,
    serie: String,
    idDocument: {
        type: String,
        unique: true
    },
    correlativo: Number,
    fechaEmision: Date,
    tipoMoneda: String,
    mtoOperGravadas: Number,
    mtoIGV: Number,
    valorVenta: Number,
    totalImpuestos: Number,
    subTotal: Number,
    mtoImpVenta: Number,
    formaPago: {
        moneda: String,
        tipo: String
    },
    client: {
        ruc: String,
        razonSocial: String,
        nombreComercial: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String
        }
    },
    company: {
        ruc: String,
        razonSocial: String,
        nombreComercial: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String
        }
    },
    legends: [

    ],
    details: [],
});
export const CompetitionModel = mongoose.model('Documents', DocumentSchema,)

