// preparo schema azienda
import { Schema, mongoose } from 'mongoose';

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    vat: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// esporto lo schema

export const Company = mongoose.model('companies', companySchema);