
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";


@injectable()
class ProcessPaymentUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(payment_data: any): Promise<void> {
        

        const paymentKeysToBase64 = Buffer.from( `${process.env.BOA_COMPRA_API_KEY}:${process.env.BOA_COMPRA_SECRET_KEY}` , "base64")
        
        const AuthHeader = `Authorization: Basic ${paymentKeysToBase64}`

        console.log(AuthHeader)
   
    }
}
export { ProcessPaymentUseCase }