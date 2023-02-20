import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    port: Number(process.env.MAIL_PORT),
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL,
        pass: process.env.KEY_MAIL,
    },
    secure: false,
})

export default transporter
