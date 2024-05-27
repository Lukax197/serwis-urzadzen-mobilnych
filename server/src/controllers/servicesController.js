import Usluga from '../models/Usluga';

export default {
    async findByType(req, res, next) {
        const uslugi = await Usluga.find({ typUrzadzenia: req.params.typeName, nazwaUslugi: { "$ne": 'Inne' } }, {_id: 0, nazwaUslugi: 1, typUrzadzenia: 1, cenaPodstawowa: 1, cenaZaGodzine: 1, przewidywanyCzas: 1, kosztCzesci: 1});
        if (!uslugi) return next();

        return res.status(200).send(uslugi);
    },

    async findByTypeOption(req, res, next) {
        const servicesFromDB = await Usluga.find({ typUrzadzenia: req.params.typeName }, {_id: 0, nazwaUslugi: 1, cenaPodstawowa: 1, cenaZaGodzine: 1, przewidywanyCzas: 1, kosztCzesci: 1});
        if (!servicesFromDB) return next();

        var servicesToSend = []
        var objInne = {}

        if(servicesFromDB !== null) {
            servicesFromDB.forEach((item) => {
                if(item.nazwaUslugi === 'Inne') {
                    objInne = {
                        value: item.nazwaUslugi.toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '_'),
                        label: item.nazwaUslugi,
                        cenaPodstawowa: item.cenaPodstawowa,
                        cenaZaGodzine: item.cenaZaGodzine,
                        przewidywanyCzas: item.przewidywanyCzas,
                        kosztCzesci: item.kosztCzesci
                    }
                }
                else {
                    servicesToSend.push({
                        value: item.nazwaUslugi.toLowerCase().replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '_'),
                        label: item.nazwaUslugi,
                        cenaPodstawowa: item.cenaPodstawowa,
                        cenaZaGodzine: item.cenaZaGodzine,
                        przewidywanyCzas: item.przewidywanyCzas,
                        kosztCzesci: item.kosztCzesci
                    })
                }
            })
            servicesToSend.push(objInne)
        }

        return res.status(200).send(servicesToSend);
    },

    async findAll(req, res) {
        const servicesFromDB = await Usluga.find()
        var servicesToSend = []

        if(servicesFromDB !== null) {
            servicesFromDB.forEach((item) => {
                servicesToSend.push({
                    id: item._id, 
                    nazwaUslugi: item.nazwaUslugi,
                    typUrzadzenia: item.typUrzadzenia,
                    cenaPodstawowa: item.cenaPodstawowa,
                    cenaZaGodzine: item.cenaZaGodzine,
                    przewidywanyCzas: item.przewidywanyCzas,
                    kosztCzesci: item.kosztCzesci
                })
            })
        }

        return res.status(200).send(servicesToSend);
    },

    async create(req, res) {
        const { 
            nazwaUslugi, 
            typUrzadzenia, 
            cenaPodstawowa, 
            cenaZaGodzine, 
            przewidywanyCzas, 
            kosztCzesci
        } = req.body

        // var value = nazwaUslugi.toLowerCase().replace(' ', '_')

        const usluga = await new Usluga({
            nazwaUslugi: nazwaUslugi, 
            typUrzadzenia: typUrzadzenia,
            cenaPodstawowa: cenaPodstawowa,
            cenaZaGodzine: cenaZaGodzine,
            przewidywanyCzas: przewidywanyCzas,
            kosztCzesci: kosztCzesci
        }).save();

        return res.status(201).send({id: usluga._id});
    },

    async update(req, res, next) {
        const { updatedUsluga } = req.body;
        
        try {
            // edycja danych usługi
            await Usluga.findOneAndUpdate({ _id: req.params.id }, updatedUsluga);
        
            res.status(201).json({ 'success': `Service was edited!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async remove(req, res, next) {
        const usluga = await Usluga.findOneAndRemove({ '_id': req.params.id });
        if (!usluga) return next();

        return res.status(200).send({ message: `Service was removed` });
    }
}