import mongoose from "mongoose";
import Double from '@mongoosejs/double';

const RepairOrderSchema = mongoose.Schema({
    nrZgloszenia: {
        type: String,
        trim: true,
        required: true
    },
    typUrzadzenia: {
        type: String,
        trim: true,
        required: true
    },
    modelMarka: {
        type: String,
        trim: true,
        required: true
    },
    imeiNrSeryjny: {
        type: String,
        trim: true,
        required: true
    },
    zamowioneUslugi : [{
        value: String, 
        label: String, 
        cenaPodstawowa: Double,
        cenaZaGodzine: Double,
        przewidywanyCzas: Double,
        kosztCzesci: Double
    }],
    opisProblemu: {
        type: String,
        trim: true,
    },
    trybZgloszenia: {
        type: String,
        trim: true,
        required: true
    },
    daneKontaktowe: {
        email: String,
        imie: String, 
        nazwisko: String, 
        adres: String, 
        kodPocztowy: String, 
        miasto: String, 
        nrTelefonu: String
    },
    metodaDostawy: {
        type: String,
        trim: true,
        required: true
    },
    zgodaRegulamin: Boolean,
    zgodaPrzetwarzanie: Boolean,
    zgodaMarketing: Boolean,
    status: String,
    dokumentacjaSerwisowa: {
        opis: String,
        wykonaneUslugi : [{
            nazwa: String,
            roboczogodziny: Double,
            cena: Double
        }],
        czesci : [{
            nazwa: String,
            ilosc: Number,
            cena: Double
        }],
        cenaSuma: {
            type: Double,
            default: 0.0
        }
    },
    userId: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
})

export default mongoose.model('RepairOrder', RepairOrderSchema)