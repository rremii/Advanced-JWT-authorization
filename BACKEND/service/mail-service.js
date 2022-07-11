const nodemailer = require("nodemailer");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
        })
    }

    async sendActivationMail(email, link) {
        await this.transporter.sendMail({
            form: process.env.SMTP_USER,
            to: email,
            subject: 'activation account on' + process.env.API_URL,
            text: '',
            html: `
                <div>
                    <h1>go for a link below to activate your account</h1>
                    <a href="${link}">click here!</a>
                </div>
            `
        })
    }
}

module.exports = new MailService()