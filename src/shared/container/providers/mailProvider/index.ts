import { container } from "tsyringe";

import "dotenv/config"


import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";
import { MailProvider } from "./implementations/MailProvider";
import { IMailProvider } from "./IMailProvider";

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider),
    node_mailer: container.resolve(MailProvider)
}

container.registerSingleton<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER as string]
)
    //força como tipo string para nao ter erro
    //com o strict null check = true