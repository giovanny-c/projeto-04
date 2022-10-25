
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";

import axios from 'axios';

@injectable()
class ProcessPaymentUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(): Promise<void> {
        
        
   
    }
}
export { ProcessPaymentUseCase }