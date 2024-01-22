//immagine locandine aziende
import {mongoose, Schema} from 'mongoose';

const locandineSchema = new Schema({
    nameOffer: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image:[{
        type: String,
        required: true
    }],
    idCompany: {
        type: Schema.Types.ObjectId,
        ref: "Companies",
        required: true,
      },
});

export const Locandine = mongoose.model('Locandine', locandineSchema, "locandine");