const nodemailer = require('nodemailer')
const pug = require('pug')
const decrypt = require('../scripts/crypto')

function render(filename, data) {
    return pug.renderFile(`${__dirname}/../views/emails/${filename}.pug`, data)
}

const sendEmail = (viewName, emailTo, subject, text, data) => {
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.EMAIL,
            pass: decrypt({iv: process.env.IV, content: process.env.CONTENT})
        }
    })

    const options = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: subject,
        text: text,
        html: render(viewName, data)
    }

    transporter.sendMail(options, function (err, info) {
        if(err) {
            console.log(err)
            return;
        }
        console.log("Sent: " + info.response)
    })
}

module.exports = sendEmail