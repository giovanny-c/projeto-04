import { Attachment } from "nodemailer/lib/mailer"


interface IMail {
    to: string
    subject: any
    variables: any
    path: string
}

interface IMailProvider {

    sendMail({ to, subject, variables, path }: IMail): Promise<void>

}

interface IPlainMailProvider {

    sendMail({service, from, password, to, subject, body}: ISendEmailRequest): Promise<void>
}


interface ISendEmailRequest {
    // host: string
    service?: string
    from: string
    password?: string
    to: string | string[]
    subject: string
    variables?: any
    path?: string 
    body?: {
        text?: string
        html?: string
        attachments?: Attachment[]
    }
    configuration?: any
}



export { IMailProvider, IPlainMailProvider, IMail, ISendEmailRequest }