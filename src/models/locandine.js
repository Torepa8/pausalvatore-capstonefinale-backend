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
    company: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
});

export const Locandine = mongoose.model('Locandine', locandineSchema, "locandine");