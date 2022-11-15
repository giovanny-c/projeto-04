import { TransactionStatus } from "@modules/Transactions/types/TransactionStatus";
import { ITransactionProviderRequest, ITransactionProviderResponse } from "../dtos/ITransactionProviderDTOs";
import { ITransactionProvider } from "../ITransactionProvider";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

class StripeTransactionProvider implements ITransactionProvider{

    async proccess({transaction_code,
        total,
        payment_type,
        installments,
        card,
        customer,
        billing,
        items} : ITransactionProviderRequest): Promise<ITransactionProviderResponse> {

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: "brl",
            payment_method_types: [
                payment_type
            ],
            metadata: {
                order_id: transaction_code
            }
            //shipping:

        })

       throw new Error()
    }
    translateStatus(status: string): TransactionStatus {
        throw new Error("Method not implemented.");
    }

}