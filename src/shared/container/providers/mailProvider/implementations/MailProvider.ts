import * as nodemailer from "nodemailer"

import {IPlainMailProvider, ISendEmailRequest } from "../IMailProvider";



class MailProvider implements IPlainMailProvider{
    
    

    
    async sendMail({service, from, password, to, subject, body}: ISendEmailRequest): Promise<void> {
    

        const mailer = nodemailer.createTransport({
            // host,
            service,
            port: 587,
            secure: false,
            // requireTLS: true
            tls:{
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            //
            auth: {
                user: from,
                pass: password
            },
            
        })

        //necessario?
        await mailer.verify()
        
        //tranformar em async?

        //mudar para async e usar await try catch no set email e nao usar nada no send receipt?
        // ou criar um webhook para msgs de erro (tentar esse 1°)
        await mailer.sendMail({
                from,
                to,
                subject,
                text: body?.text || undefined,
                html: body?.html || undefined,
                attachments: body?.attachments || undefined
        })
        
    }

}

export {MailProvider}
