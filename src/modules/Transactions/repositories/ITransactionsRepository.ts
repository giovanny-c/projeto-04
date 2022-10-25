import ISaveTransaction from "../dtos/ISaveTransactionDTO"
import { Transaction } from "../entities/Transaction"


interface ITransactionsRepository{

    save(data: ISaveTransaction): Promise<Transaction>
    findById(id: string): Promise<Transaction>
    findByUserId(customer_id: string): Promise<Transaction[]>
}

export {ITransactionsRepository}