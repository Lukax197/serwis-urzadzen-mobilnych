import User from '../models/User';
import RepairOrder from '../models/RepairOrder';
import SentEmails from '../models/SentEmails';
const { zgloszenieNotify, zmianaStatusuNotify, podsumowanieNotify, anulowanoNotify } = require('../mailers/appMailer')

export default {
    async findOne(req, res, next) {
        const orderFromDB = await RepairOrder.findOne({ _id: req.params.id })
        if (!orderFromDB) return next();

        var date = new Date(orderFromDB.createdAt)

        const orderToSend = {
            id: orderFromDB._id,
            nrZgloszenia: orderFromDB.nrZgloszenia,
            typUrzadzenia: orderFromDB.typUrzadzenia,
            modelMarka: orderFromDB.modelMarka,
            imeiNrSeryjny: orderFromDB.imeiNrSeryjny,
            zamowioneUslugi: orderFromDB.zamowioneUslugi,
            opisProblemu: orderFromDB.opisProblemu,
            trybZgloszenia: orderFromDB.trybZgloszenia,
            daneKontaktowe: orderFromDB.daneKontaktowe,
            metodaDostawy: orderFromDB.metodaDostawy,
            zgodaRegulamin: orderFromDB.zgodaRegulamin,
            zgodaPrzetwarzanie: orderFromDB.zgodaPrzetwarzanie,
            zgodaMarketing: orderFromDB.zgodaMarketing,
            status: orderFromDB.status,
            dokumentacjaSerwisowa: orderFromDB.dokumentacjaSerwisowa,
            dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
        }

        return res.status(200).send(orderToSend);
    },

    async findAll(req, res) {
        const ordersFromDB = await RepairOrder.find({}, { modelMarka: 1, zamowioneUslugi: 1, status: 1, createdAt: 1 })
        var ordersToSend = []

        if(ordersFromDB !== null) {
            ordersFromDB.forEach((item) => {
                var date = new Date(item.createdAt)

                ordersToSend.push({
                    id: item._id, 
                    modelMarka: item.modelMarka,
                    zamowioneUslugi: item.zamowioneUslugi,
                    status: item.status,
                    dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
                })
            })
        }

        return res.status(200).send(ordersToSend);
    },

    async findByUserId(req, res) {
        const orderFromDB = await RepairOrder.find({ userId: req.params.id }, {nrZgloszenia: 1, modelMarka: 1, status: 1, createdAt: 1}, {sort: {'_id': -1}})
        if (!orderFromDB) return next();

        var orderToSend = []

        orderFromDB.map((item) => {
            var date = new Date(item.createdAt)

            orderToSend.push({
                id: item._id,
                nrZgloszenia: item.nrZgloszenia,
                modelMarka: item.modelMarka,
                status: item.status,
                dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
            })
        })

        return res.status(200).send(orderToSend);
    },

    async zleceniaCount(req, res) {
        var startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);
        var startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
        var countThisMonth
        var countLastMonth

        try {
            countThisMonth = await RepairOrder.find({
                createdAt: {
                    $gte: startOfCurrentMonth,
                    $lt: startOfNextMonth
                }
            }).count();

            startOfCurrentMonth = new Date();
            startOfCurrentMonth.setDate(1);
            startOfCurrentMonth.setMonth(startOfCurrentMonth.getMonth() - 1);
            startOfNextMonth = new Date();
            startOfNextMonth.setDate(1);
            startOfNextMonth.setMonth(startOfNextMonth.getMonth());

            countLastMonth = await RepairOrder.find({
                createdAt: {
                    $gte: startOfCurrentMonth,
                    $lt: startOfNextMonth
                }
            }).count();
        }
        catch(err) {
            return res.status(500).send(err.message);
        }

        return res.status(200).send({countThisMonth, countLastMonth});
    },

    async zleceniaDochodSum(req, res) {
        var startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);
        var startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
        var zleceniaThisMonth
        var zleceniaLastMonth
        var dochodThisMonth = 0
        var dochodLastMonth = 0

        try {
            zleceniaThisMonth = await RepairOrder.find({
                createdAt: {
                    $gte: startOfCurrentMonth,
                    $lt: startOfNextMonth
                }
            });

            zleceniaThisMonth.map((item) => {
                dochodThisMonth += parseFloat(item.dokumentacjaSerwisowa.cenaSuma)
            })


            startOfCurrentMonth = new Date();
            startOfCurrentMonth.setDate(1);
            startOfCurrentMonth.setMonth(startOfCurrentMonth.getMonth() - 1);
            startOfNextMonth = new Date();
            startOfNextMonth.setDate(1);
            startOfNextMonth.setMonth(startOfNextMonth.getMonth());

            zleceniaLastMonth = await RepairOrder.find({
                createdAt: {
                    $gte: startOfCurrentMonth,
                    $lt: startOfNextMonth
                }
            });

            zleceniaLastMonth.map((item) => {
                dochodLastMonth += parseFloat(item.dokumentacjaSerwisowa.cenaSuma)
            })
        }
        catch(err) {
            return res.status(500).send(err.message);
        }

        return res.status(200).send({dochodThisMonth, dochodLastMonth});
    },

    async create(req, res) {
        const {
            typUrzadzenia, 
            modelMarka, 
            imeiNrSeryjny,
            uslugi,
            opisProblemu,
            trybZgloszenia,
            daneKontaktowe,
            dostawa,
            zgodaRegulamin,
            zgodaPrzetwarzanie,
            zgodaMarketing,
            userId
        } = req.body;

        const isUser = await User.findOne({ email: daneKontaktowe.email })
        if(isUser && trybZgloszenia === 'gosc') return res.sendStatus(409)

        var lastOrder = await RepairOrder.find({}).sort( [['_id', -1]] ).limit(1)

        if(lastOrder.length === 0) {
            lastOrder = [{nrZgloszenia: undefined}]
        }

        const actualYear = new Date().getFullYear()
        var nrZgloszenia = ""
        var lastNumber = 1


        if(lastOrder[0].nrZgloszenia !== undefined) {
            lastNumber = parseInt(lastOrder[0].nrZgloszenia.split('/')[1]) + 1
            nrZgloszenia = "MS/" + lastNumber + "/" + actualYear
        }
        else {
            nrZgloszenia = "MS/1/" + actualYear
        }

        try {
            const zgloszenie = await RepairOrder.create({
                "nrZgloszenia": nrZgloszenia,
                "typUrzadzenia": typUrzadzenia.value,
                "modelMarka": modelMarka,
                "imeiNrSeryjny": imeiNrSeryjny,
                "zamowioneUslugi": uslugi,
                "opisProblemu": opisProblemu,
                "trybZgloszenia": trybZgloszenia,
                "daneKontaktowe": daneKontaktowe,
                "metodaDostawy": dostawa,
                "zgodaRegulamin": zgodaRegulamin,
                "zgodaPrzetwarzanie": zgodaPrzetwarzanie,
                "zgodaMarketing": zgodaMarketing,
                "status": "Oczekiwanie na dostawę",
                "dokumentacjaSerwisowa": {
                    "opis": "",
                    "wykonaneUslugi": [],
                    "czesci": [],
                    "cenaSuma": 0.0
                },
                "userId": userId
            });

            var name

            if(trybZgloszenia === 'gosc') {
                name = daneKontaktowe.imie
            }
            else {
                name = isUser.nazwaUzytkownika
            }

            var uslugiParse = []

            uslugi.map((item) => {
                uslugiParse.push(item.label)
            })

            var date = new Date(zgloszenie.createdAt)
            
            zgloszenieNotify({
                to: daneKontaktowe.email,
                name: name,
                id: zgloszenie.nrZgloszenia,
                modelMarka: modelMarka,
                status: "Oczekiwanie na dostawę",
                uslugi: uslugiParse,
                dataZgloszenia: date.toLocaleDateString() + " " + date.toLocaleTimeString()
            })

            await SentEmails.create({adresat: daneKontaktowe.email, typWiadomosci: 'Potwierdzenie złożenia zamówienia'})

            res.status(201).json({ 'success': `New order created!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }

        return res.status(201).send();
    },

    async updateDaneZgloszenia(req, res, next) {
        // pobranie przesłanych wartości i sprawdzenie poprawności
        const { updatedZgloszenie } = req.body;
        
        try {
            // edycja danych zgloszenia
            await RepairOrder.findOneAndUpdate({ _id: req.params.id }, updatedZgloszenie);
        
            res.status(201).json({ 'success': `Order was edited!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async updateDokumentSerwisowy(req, res, next) {
        const { status, dokumentSerwisowy } = req.body

        try {
            // edycja dokumentu serwisowego
            const order = await RepairOrder.findOneAndUpdate({ _id: req.params.id }, {"status": status, "dokumentacjaSerwisowa": dokumentSerwisowy});

            if(status === 'Zrealizowano') {
                var uslugi = []
                dokumentSerwisowy.wykonaneUslugi.map((item) => {
                    uslugi.push({nazwaUslugi: item.nazwa, ilosc: item.roboczogodziny, cena: item.cena})
                })
                dokumentSerwisowy.czesci.map((item) => {
                    uslugi.push({nazwaUslugi: item.nazwa, ilosc: item.ilosc, cena: item.cena})
                })

                podsumowanieNotify({
                    to: order.daneKontaktowe.email,
                    nrZgloszenia: order.nrZgloszenia,
                    name: order.daneKontaktowe.imie, 
                    cena: dokumentSerwisowy.cenaSuma,
                    uslugi: uslugi,
                    opis: dokumentSerwisowy.opis
                })
    
                await SentEmails.create({adresat: order.daneKontaktowe.email, typWiadomosci: 'Podsumowanie naprawy'})
            }
        
            res.status(201).json({ 'success': `Service document was edited!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async updateStatusZgloszenia(req, res, next) {
        const { status } = req.body

        try {
            // zmiana statusu naprawy
            const order = await RepairOrder.findOneAndUpdate({ _id: req.params.id }, {status: status});

            zmianaStatusuNotify({
                to: order.daneKontaktowe.email,
                name: order.daneKontaktowe.imie,
                nrZgloszenia: order.nrZgloszenia,
                status: "W trakcie naprawy",
            })

            await SentEmails.create({adresat: order.daneKontaktowe.email, typWiadomosci: 'Zmiana statusu zgłoszenia'})
            
            res.status(201).json({ 'success': `Service document was edited!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async anulowanieZgloszenia(req, res, next) {
        try {
            // zmiana statusu naprawy
            const order = await RepairOrder.findOneAndUpdate({ _id: req.params.id }, {status: 'Anulowano'});

            anulowanoNotify({
                to: order.daneKontaktowe.email,
                name: order.daneKontaktowe.imie,
                nrZgloszenia: order.nrZgloszenia,
                status: "Anulowano",
            })

            await SentEmails.create({adresat: order.daneKontaktowe.email, typWiadomosci: 'Anulowanie zgłoszenia'})
            
            res.status(201).json({ 'success': `Service document was edited!` });
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async remove(req, res, next) {
        const order = await RepairOrder.findOneAndRemove({ '_id': req.params.id });
        if (!order) return next();

        return res.status(200).send({ message: `Order was removed` });
    }
}