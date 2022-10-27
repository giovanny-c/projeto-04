import { container } from "tsyringe";
import "dotenv/config"
import { PagarMeTransactionProvider } from "./implementations/PagarMeTransactionProvider";
import { ITransactionProvider } from "./ITransactionProvider";

const gateway = {
    pagarme: PagarMeTransactionProvider,
    
}

container.registerSingleton<ITransactionProvider>(
    "TransactionProvider",
    gateway[process.env.PAYMENT_GATEWAY as string]
)