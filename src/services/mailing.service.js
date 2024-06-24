const nodemailer = require('nodemailer');
const { mailing  } = require('../config/config');

const transport = nodemailer.createTransport({
    service: mailing.service,
    port: mailing.port,
    auth: mailing.auth
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

    async sendDeletedAccountMail(name, destinationMail){

        await transport.sendMail({
            from: `Node service <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Cuenta borrada`,
            html: `
                <div>
                    <h1>Buen dia ${name}</h1>
                    <h1>Lamentamos informarle que su cuenta ha sido borrada debido a inactividad.</h1>
                </div>
            `
        })
    }

    async sendDeletedPremiumProductMail(destinationMail, productDescription){

        await transport.sendMail({
            from: `Node service <${mailing.auth.user}>`,
            to: destinationMail,
            subject: `Producto eliminado`,
            html: `
                <div>
                    <h1>Lamentamos informarle que su producto "${productDescription}" fue borrado por un administrador. Lamentamos el inconveniente.</h1>
                </div>
            `
        })
    }
}

module.exports = MailingService; 