//schema degli utenti che si registrano

import { Schema, mongoose } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const User = mongoose.model('User', userSchema, "users");