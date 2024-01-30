//immagine locandine aziende
import {mongoose, Schema} from 'mongoose';

const locandineSchema = new Schema({
    nameOffer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    expirationDate: {
        type: Date,
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies",
      }
});

export const Locandine = mongoose.model('locandine', locandineSchema, "locandine");