import register from "babel-core/register";
import User from "../models/User";
import SentEmails from "../models/SentEmails";
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt'
const { registerNotify } = require('../mailers/appMailer')
const jwtDecode = require('jwt-decode');

export default {
    async login(req, res, next) {
        const { email, pwd } = req.body;

        if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

        const foundUser = await User.findOne({ email: email });
        if (!foundUser) return res.sendStatus(401);

        const match = await bcrypt.compare(pwd, foundUser.password);

        if(match) {
            const userInfo = {
                "UserInfo": {
                    "id": foundUser._id,
                    "username": foundUser.nazwaUzytkownika,
                    "roles": foundUser.roles,
                }
            }

            const accessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET, {expiresIn: 20})
            const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 525600})

            await User.findOneAndUpdate({ '_id': foundUser._id },{ refreshToken: refreshToken }); 

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.send({accessToken, refreshToken})
        }
        else {
            res.sendStatus(401);
        }
    },

    async register(req, res) {
        // pobranie przesłanych wartości i sprawdzenie poprawności
        const { email, pwd, nazwaUzytkownika, daneOsobowe } = req.body;
        if (!email || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

        // sprawdzenie czy użytkownik istnieje
        var duplicate = await User.findOne({ email: email });
        if (duplicate) return res.sendStatus(409);

        // sprawdzenie czy nazwa użytkownika istnieje
        duplicate = await User.findOne({ nazwaUzytkownika: nazwaUzytkownika });
        if (duplicate) return res.status(410).send({ message: `Nazwa użytkownika istnieje już w bazie danych` }); 

        try {
            // szyfrowanie hasła
            const hashedPwd = await bcrypt.hash(pwd, 10);
    
            // tworzenie konta użytkownika
            await User.create({
                "nazwaUzytkownika": nazwaUzytkownika,
                "email": email,
                "password": hashedPwd,
                "daneOsobowe": daneOsobowe
            });

            // wysłanie emaila potwierdzającego
            registerNotify({to: email, name: nazwaUzytkownika})
            await SentEmails.create({adresat: email, typWiadomosci: 'Potwierdzenie utworzenia konta'})

            res.status(201).json({ 'success': `New user ${nazwaUzytkownika} created!` });
        } catch (err) {
            res.status(500).json({ 'message': err.message });
        }
    },
    
    async refresh(req, res) {
        const refreshToken = req.cookies.jwt

        if(!refreshToken) {
            return res.status(401)
        }

        try{
            await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        }
        catch (err) {
            return res.sendStatus(403)
        }

        const userInfo = {"UserInfo":  jwtDecode(refreshToken).UserInfo}

        const accessToken = jwt.sign(userInfo, process.env.TOKEN_SECRET, {expiresIn: 86400})

        res.send({accessToken})
    },

    async logout(req, res) {
        const refreshToken = req.cookies.jwt
        const foundUser = await User.findOne({refreshToken})

        if(!foundUser) { return res.sendStatus(204) }

        foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken)
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

        res.sendStatus(200)
    }
}