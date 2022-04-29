import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VoidedSchema = new Schema({
    parentDocument: {
        type: String,
        unique: true
    },
    parent:{},
    serie: String,
    correlativo: Number,
    fecGeneracion: String,
    fecComunicacion: String,
    company: {
        ruc: String,
        razonSocial: String,
        nombreComercial: String,
        address: {
            direccion: String,
            provincia: String,
            departamento: String,
            distrito: String,
            ubigueo: String,
        }
    },
    sunatResponse: {
        success: Boolean,
        ticket: String
    },
    details: []
});
export const VoidedModel = mongoose.model('Voideds', VoidedSchema,)
