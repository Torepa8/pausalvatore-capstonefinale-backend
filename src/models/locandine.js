//immagine locandine aziende
import {mongoose, Schema} from 'mongoose';

const locandineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    immagine:[{
        type: String,
        required: true
    }],
    idCompany: {
        type: Schema.Types.ObjectId,
        ref: "companies",
        required: true,
      },
});

export const Locandine = mongoose.model('Locandine', locandineSchema, "locandine");