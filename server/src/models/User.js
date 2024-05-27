import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    nazwaUzytkownika: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    daneOsobowe: {
        imie: String,
        nazwisko: String,
        adres: String,
        kodPocztowy: String,
        miasto: String,
        nrTelefonu: String
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Employee: Number,
        Admin: Number
    },
    refreshToken: [String]
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)