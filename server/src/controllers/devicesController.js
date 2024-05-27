import Devices from '../models/Device';

export default {
    async findOne(req, res, next) {
        const usluga = await Devices.findOne({ _id: req.params.id }, { nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 });
        if (!usluga) return next();
        return res.status(200).send(usluga);
    },

    async findAll(req, res) {
        const devices = await Devices.find({}, { _id: 0, nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 })
        return res.status(200).send(devices);
    },

    async findAllWithCount(req, res) {
        const devicesFromDB = await Devices.find({}, { nazwaUrzadzenia: 1, typUrzadzenia: 1, uslugi: 1 })
        var devicesToSend = []

        if(devicesFromDB !== null) {
            devicesFromDB.forEach((item) => {
                devicesToSend.push({
                    id: item._id, 
                    nazwaUrzadzenia: item.nazwaUrzadzenia,
                    typUrzadzenia: item.typUrzadzenia,
                    iloscUslug: item.uslugi.length
                })
            })
        }

        return res.status(200).send(devicesToSend);
    },

    async create(req, res) {
        var {nazwaUrzadzenia, typUrzadzenia, uslugi} = req.body

        const urzadzenie = await new Devices({
            nazwaUrzadzenia: nazwaUrzadzenia,
            typUrzadzenia: typUrzadzenia,
            uslugi: uslugi
        }).save();

        return res.status(201).send({ message: `New device has been added` });
    },

    async update(req, res, next) {
        const { nazwaUrzadzenia, typUrzadzenia, uslugi } = req.body

        const urzadzenia = await Devices.findOneAndUpdate(
            { '_id': req.params.id },
            { 
                nazwaUrzadzenia: nazwaUrzadzenia, 
                typUrzadzenia: typUrzadzenia,
                uslugi: uslugi
            });
        if (!urzadzenia) return next()

        return res.status(200).send({ message: `Device was updated` });
    },

    async remove(req, res, next) {
        const urzadzenie = await Devices.findOneAndRemove({ '_id': req.params.id });
        if (!urzadzenie) return next();

        return res.status(200).send({ message: `Device was removed` });
    }
}