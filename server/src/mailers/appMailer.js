const sendEmail = require('./mailer')

const registerNotify = (options) => {
    sendEmail(
        'register-notification', 
        options.to, 
        '[MobileService.pl] Witamy w naszych szeregach!',
        'Dziękujemy za rejestrację w naszym serwisie!',
        {name: options.name}
    )
}

const zgloszenieNotify = (options) => {
    sendEmail(
        'zgloszenie-notification', 
        options.to, 
        '[MobileService.pl] Pomyślnie utworzono zgłoszenie!',
        'Dziękujemy za Twoje zgłoszenie!',
        {
            name: options.name, 
            id: options.id,
            modelMarka: options.modelMarka,
            status: options.status,
            uslugi: options.uslugi,
            dataZgloszenia: options.dataZgloszenia
        }
    )
}

const zmianaStatusuNotify = (options) => {
    sendEmail(
        'zmiana-statusu-notification', 
        options.to, 
        '[MobileService.pl] Zmiana statusu zgłoszenia ' + options.nrZgloszenia,
        'Twoje zgłoszenie zmieniło status!',
        {
            nrZgloszenia: options.nrZgloszenia,
            name: options.name, 
            status: options.status,
        }
    )
}

const anulowanoNotify = (options) => {
    sendEmail(
        'anulowano-notification', 
        options.to, 
        '[MobileService.pl] Anulowano zgłoszenie ' + options.nrZgloszenia,
        'Anulowano zgłoszenie!',
        {
            nrZgloszenia: options.nrZgloszenia,
            name: options.name, 
            status: options.status,
        }
    )
}

const podsumowanieNotify = (options) => {
    sendEmail(
        'zrealizowano-notification', 
        options.to, 
        '[MobileService.pl] Ukończono naprawę!',
        'Twoja naprawa została ukończona!',
        {
            nrZgloszenia: options.nrZgloszenia,
            name: options.name, 
            cena: options.cena,
            uslugi: options.uslugi,
            opis: options.opis
        }
    )
}

const sendText = (options) => {
    sendEmail(
        'sendText-notification', 
        options.to, 
        '[MobileService.pl] ' + options.temat,
        'Wiadomość od serwisanta',
        {
            tresc: options.tresc,
        }
    )
}

module.exports = {
    registerNotify, 
    zgloszenieNotify, 
    zmianaStatusuNotify, 
    podsumowanieNotify, 
    sendText, 
    anulowanoNotify
}