import mongoose from "mongoose";
import Double from '@mongoosejs/double';

const ServiceSchema = mongoose.Schema({
    nazwaUslugi: String, 
    typUrzadzenia: String,
    cenaPodstawowa: Double,
    cenaZaGodzine: Double,
    przewidywanyCzas: Double,
    kosztCzesci: Double
}, {
    timestamps: true
})

export default mongoose.model('Services', ServiceSchema)