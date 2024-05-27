import mongoose from "mongoose";

const SentEmailsSchema = mongoose.Schema({
    adresat: {
        type: String,
        trim: true,
        required: true
    },
    typWiadomosci: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('SentEmails', SentEmailsSchema)