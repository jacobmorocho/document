import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema  = new Schema({
    ruc: String,
    razonSocial: String,
    nombreComercial: String,
    address: {
        direccion: String,
        provincia: String,
        departamento: String,
        distrito: String,
        ubigueo: String
    },
    tipePdf:{
       link:String,
       name:String
    },
    series:[],
    users:[]
})
export const CompanyModel = mongoose.model('Companys', CompanySchema,)
