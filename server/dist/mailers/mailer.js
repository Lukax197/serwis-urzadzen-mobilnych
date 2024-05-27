'use strict';

var nodemailer = require('nodemailer');
var pug = require('pug');
var decrypt = require('../scripts/crypto');

function render(filename, data) {
    return pug.renderFile(__dirname + '/../views/emails/' + filename + '.pug', data);
}

var sendEmail = function sendEmail(viewName, emailTo, subject, text, data) {
    var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL,
            pass: decrypt({ iv: process.env.IV, content: process.env.CONTENT })
        }
    });

    var options = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: subject,
        text: text,
        html: render(viewName, data)
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    });
};

module.exports = sendEmail;