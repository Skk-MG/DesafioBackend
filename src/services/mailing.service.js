const nodemailer = require('nodemailer');
const { mailing  } = require('../config/config');

const transport = nodemailer.createTransport({
    service: mailing.service,
    port: mailing.port,
    auth:mailing.auth
})

class MailingService {
    async sendRegisterMail(destinationMail){
        await transport.sendMail({
            from: `Coder test <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Registration mail `,
            html: `
                <h1>Este es un correo para registrarse</h1>
            `
        })
    }

    async sendPurchaseMail(destinationMail, ticketCode = "1234" ){
        await transport.sendMail({
            from: `Coder test <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Purchase`,
            html: `
                <h1>Acabas de comprar los contenidos del ticket ${ticketCode}</h1>
            `
        })
    }

    async sendPasswordResetMail(user, destinationMail, passwordResetToken){

        await transport.sendMail({
            from: `Node service <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Password reset`,
            html: `
                <div>
                    <h1>Haz click en el link para restablecer tu contraseña</h1>
                    <a href="http://localhost:8080/api/sessions/changePassword/${passwordResetToken}">Restablecer Contraseña</a>
                </div>
            `
        })
    }
}

module.exports = MailingService; 