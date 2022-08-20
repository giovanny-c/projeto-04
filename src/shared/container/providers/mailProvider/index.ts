import { container } from "tsyringe";

import "dotenv/config"

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER as string]
    //força como tipo string para nao ter erro
    //com o strict null check = true
)