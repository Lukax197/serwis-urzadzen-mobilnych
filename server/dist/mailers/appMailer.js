'use strict';

var sendEmail = require('./mailer');

var registerNotify = function registerNotify(options) {
    sendEmail('register-notification', options.to, '[MobileService.pl] Witamy w naszych szeregach!', 'Dziękujemy za rejestrację w naszym serwisie!', { name: options.name });
};

var zgloszenieNotify = function zgloszenieNotify(options) {
    sendEmail('zgloszenie-notification', options.to, '[MobileService.pl] Pomyślnie utworzono zgłoszenie!', 'Dziękujemy za Twoje zgłoszenie!', {
        name: options.name,
        id: options.id,
        modelMarka: options.modelMarka,
        status: options.status,
        uslugi: options.uslugi,
        dataZgloszenia: options.dataZgloszenia
    });
};

var zmianaStatusuNotify = function zmianaStatusuNotify(options) {
    sendEmail('zmiana-statusu-notification', options.to, '[MobileService.pl] Zmiana statusu zgłoszenia ' + options.nrZgloszenia, 'Twoje zgłoszenie zmieniło status!', {
        nrZgloszenia: options.nrZgloszenia,
        name: options.name,
        status: options.status
    });
};

var podsumowanieNotify = function podsumowanieNotify(options) {
    sendEmail('zrealizowano-notification', options.to, '[MobileService.pl] Ukończono naprawę!', 'Twoja naprawa została ukończona!', {
        nrZgloszenia: options.nrZgloszenia,
        name: options.name,
        cena: options.cena,
        uslugi: options.uslugi,
        opis: options.opis
    });
};

var sendText = function sendText(options) {
    sendEmail('sendText-notification', options.to, '[MobileService.pl] ' + options.temat, 'Wiadomość od serwisanta', {
        tresc: options.tresc
    });
};

module.exports = { registerNotify: registerNotify, zgloszenieNotify: zgloszenieNotify, zmianaStatusuNotify: zmianaStatusuNotify, podsumowanieNotify: podsumowanieNotify, sendText: sendText };