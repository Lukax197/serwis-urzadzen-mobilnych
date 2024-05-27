import mongoose from "mongoose";
import Double from '@mongoosejs/double';

const DeviceSchema = mongoose.Schema({
    nazwaUrzadzenia: String,
    typUrzadzenia: String,
    uslugi: [{
        nazwaUslugi: String, 
        typUrzadzenia: String,
        cenaPodstawowa: Double,
        cenaZaGodzine: Double,
        przewidywanyCzas: Double,
        kosztCzesci: Double
    }]
}, {
    timestamps: true
})

export default mongoose.model('Devices', DeviceSchema)