import SentEmails from '../models/SentEmails';
const { sendText } = require('../mailers/appMailer')

export default {
    async findAll(req, res) {
        const sentEmailsFromDB = await SentEmails.find()
        var sentEmailsToSent = []

        if(sentEmailsFromDB !== null) {
            sentEmailsFromDB.forEach((item) => {
                var date = new Date(item.createdAt)

                sentEmailsToSent.push({
                    id: item._id, 
                    adresat: item.adresat,
                    typWiadomosci: item.typWiadomosci,
                    dataWyslania: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                })
            })
        }

        return res.status(200).send(sentEmailsToSent);
    },

    async findAllByEmail(req, res) {
        const sentEmailsFromDB = await SentEmails.find({ adresat: req.params.adresat })
        var sentEmailsToSent = []

        if(sentEmailsFromDB !== null) {
            sentEmailsFromDB.forEach((item) => {
                var date = new Date(item.createdAt)

                sentEmailsToSent.push({
                    id: item._id, 
                    adresat: item.adresat,
                    typWiadomosci: item.typWiadomosci,
                    dataWyslania: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                })
            })
        }

        return res.status(200).send(sentEmailsToSent);
    },

    async findAllByEmailAndType(req, res) {
        const sentEmailsFromDB = await SentEmails.find({ adresat: req.params.adresat, typWiadomosci: { $eq: 'Wysłanie wiadomości' }})
        var sentEmailsToSent = []

        if(sentEmailsFromDB !== null) {
            sentEmailsFromDB.forEach((item) => {
                var date = new Date(item.createdAt)

                sentEmailsToSent.push({
                    id: item._id, 
                    adresat: item.adresat,
                    typWiadomosci: item.typWiadomosci,
                    dataWyslania: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                })
            })
        }

        return res.status(200).send(sentEmailsToSent);
    },

    async sendEmail(req, res) {
        const { email, temat, tresc } = req.body

        try {
            sendText({
                to: email,
                temat: temat,
                tresc: tresc, 
            })

            await SentEmails.create({adresat: email, typWiadomosci: 'Wysłanie wiadomości'})
        }
        catch(err) {
            return res.status(500).send({message: err.message});
        }

        return res.status(200).send({message: 'Email was sent'});
    }
}