import * as fs from 'fs'
import * as path from 'path'
import * as Handlebars from 'handlebars'
import transporter from '.'

const sendMail = (
    mailTemplate: string,
    data: any,
    to: string,
    subject: string,
    text: string,
): void => {
    let template = mailTemplate
    template = path.join(__dirname, `../nodeMailer/hbs/${template}.hbs`)
    const templateContent: any = fs.readFileSync(template)

    const compiledTemplate = Handlebars.compile(templateContent.toString())(
        data,
    )

    transporter.sendMail(
        {
            from: process.env.MAIL,
            to,
            subject,
            text,
            html: compiledTemplate,
        },
        err => {
            if (err) console.log(err)
        },
    )
}

export default sendMail
