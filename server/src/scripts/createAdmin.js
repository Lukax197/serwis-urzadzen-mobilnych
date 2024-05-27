import User from '../models/User';
import decrypt from './crypto';

const createAdmin = async () => {
    const admin = await User.findOne({roles: {User: 2001, Admin: 2002}});

    if(admin == null) {
        await User.create({
            "nazwaUzytkownika": 'admin',
            "email": process.env.EMAIL,
            "password": process.env.ADMIN_PASSWORD,
            "daneOsobowe": {
                imie: '',
                nazwisko: '',
                adres: '',
                kodPocztowy: '',
                miasto: '',
                nrTelefonu: ''
            },
            "roles": {
                User: 2001,
                Admin: 2002
            }
        });
        console.log("Pomyślnie utworzono konto administratora!")
    }

    // const dec = decrypt({iv: process.env.IV, content: process.env.CONTENT})

    // console.log("Hasło: " + dec)
  }
  
  module.exports = createAdmin