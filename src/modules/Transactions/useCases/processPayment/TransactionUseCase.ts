
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";

import axios from 'axios';

@injectable()
class TransactionUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(): Promise<void> {
        
        
   
    }
}
export { TransactionUseCase }