import User from '../models/User';
import bcrypt from 'bcrypt'

export default {
    async findOne(req, res, next) {
        const userFromDB = await User.findOne({ _id: req.params.id }, { nazwaUzytkownika: 1, email: 1, roles: 1, daneOsobowe: 1})
        if (!userFromDB) return next();

        const userToSend = {
            id: userFromDB._id, 
            nazwaUzytkownika: userFromDB.nazwaUzytkownika,
            email: userFromDB.email,
            roles: userFromDB.roles,
            daneOsobowe: userFromDB.daneOsobowe
        }

        return res.status(200).send(userToSend);
    },

    async getUserDaneOsobowe(req, res, next) {
        const userFromDB = await User.findOne({ nazwaUzytkownika: req.params.username }, {  _id: 0, email: 1, daneOsobowe: 1})

        return res.status(200).send(userFromDB);
    },

    async findAll(req, res) {
        const usersFromDB = await User.find({}, { nazwaUzytkownika: 1, email: 1, roles: 1, daneOsobowe: 1})
        var usersToSend = []

        if(usersFromDB !== null) {
            usersFromDB.forEach((item) => {
                usersToSend.push({
                    id: item._id, 
                    nazwaUzytkownika: item.nazwaUzytkownika,
                    email: item.email,
                    roles: item.roles,
                    daneOsobowe: item.daneOsobowe
                })
            })
        }

        return res.status(200).send(usersToSend);
    },

    async create(req, res) {
        const { nazwaUzytkownika, email, pwd, roles, daneOsobowe } = req.body;
        if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

        // sprawdzenie czy użytkownik istnieje
        var duplicate = await User.findOne({ email: email });
        if (duplicate) return res.sendStatus(409);

        // sprawdzenie czy nazwa użytkownika istnieje
        duplicate = await User.findOne({ nazwaUzytkownika: nazwaUzytkownika });
        if (duplicate) return res.sendStatus(410); 

        try {
            // szyfrowanie hasła
            const hashedPwd = await bcrypt.hash(pwd, 10);
    
            // tworzenie konta użytkownika
            await User.create({
                "nazwaUzytkownika": nazwaUzytkownika,
                "email": email,
                "password": hashedPwd,
                "daneOsobowe": daneOsobowe,
                "roles": roles,
            });

            res.status(201).json({ 'success': `New user ${nazwaUzytkownika} created!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }

        return res.status(201).send();
    },

    async update(req, res, next) {
        // pobranie przesłanych wartości i sprawdzenie poprawności
        const { user, updatedUser } = req.body;

        if (!updatedUser.email || !updatedUser.nazwaUzytkownika) return res.status(400).json({ 'message': 'Username and password are required.' });
        
        // sprawdzenie czy użytkownik istnieje
        if(user.email !== updatedUser.email) {
            var duplicate = await User.findOne({ email: updatedUser.email });
            if (duplicate) return res.sendStatus(409);
        }
        
        // sprawdzenie czy nazwa użytkownika istnieje
        if(user.nazwaUzytkownika !== updatedUser.nazwaUzytkownika) {
            duplicate = await User.findOne({ nazwaUzytkownika: updatedUser.nazwaUzytkownika });
            if (duplicate) return res.sendStatus(410); 
        }
        
        try {
            var userToSave

            if(updatedUser.noweHaslo !== undefined) {
                // szyfrowanie hasła
                const hashedPwd = await bcrypt.hash(updatedUser.noweHaslo, 10);
                userToSave = {
                    "nazwaUzytkownika": updatedUser.nazwaUzytkownika,
                    "email": updatedUser.email,
                    "password": hashedPwd,
                    "roles": updatedUser.roles,
                    "daneOsobowe": updatedUser.daneOsobowe
                }
            }
            else {
                userToSave = {
                    "nazwaUzytkownika": updatedUser.nazwaUzytkownika,
                    "email": updatedUser.email,
                    "roles": updatedUser.roles,
                    "daneOsobowe": updatedUser.daneOsobowe
                }
            }
            
            // edycja konta użytkownika
            await User.findOneAndUpdate({ '_id': user.id }, userToSave);
        
            res.status(201).json({ 'success': `User ${updatedUser.nazwaUzytkownika} was edited!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
        return res.status(201).send();
    },

    async remove(req, res, next) {
        const user = await User.findOneAndRemove({ '_id': req.params.id });
        if (!user) return next();

        return res.status(200).send({ message: `User was removed` });
    },

    async userCount(req, res, next) {
        var startOfCurrentMonth = new Date();
        startOfCurrentMonth.setDate(1);
        var startOfNextMonth = new Date();
        startOfNextMonth.setDate(1);
        startOfNextMonth.setMonth(startOfNextMonth.getMonth() + 1);
        var countThisMonth
        var countLastMonth

        try {
            countThisMonth = await User.find({
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

            countLastMonth = await User.find({
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
    }
}