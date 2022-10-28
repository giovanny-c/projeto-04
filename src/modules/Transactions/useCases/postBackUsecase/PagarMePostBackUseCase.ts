

import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import {IOrdersRepository}  from "@modules/Orders/repositories/IOrdersRepository"
import { ITransactionsRepository } from "@modules/Transactions/repositories/ITransactionsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { ITransactionProvider } from "@shared/container/providers/transactionProvider/ITransactionProvider";
import *  as pagarme from "pagarme" 
import TransactionStatusToOrderStatus from "@modules/Orders/mapper/TransactionStatusToOrderStatus";

interface IRequest {

    transaction_id: string, object: string, current_status: string
}


@injectable()
class PagarMePostBackUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider ,
        @inject("TransactionProvider")
        private transactionProvider: ITransactionProvider
    ) { }

    async execute({current_status, object, transaction_id}: IRequest): Promise<any> {
        
        
        //pagarme.postback.verifySignature()

        let transaction
        
        
        if(object === "transaction"){
            
            transaction = await this.transactionsRepository.findByTransactionId(transaction_id)
         
        }


        if(!transaction){
            return {
                status: 404 //manda a resposta para o pagarme
            }
        }

    
        const newStatus = this.transactionProvider.translateStatus(current_status)

        if(!newStatus){
            return {
                status: 404
            }
        }

        //salva o novo status que voltou do webhook
        await this.transactionsRepository.save({
            ...transaction,
            status: newStatus,
            updated_at: this.dateProvider.dateNow()
        })

        //atualiza o status da order
        //, ver se é possivel voltar mais status alem de approved e refused na rota de postback 
        const order = await this.ordersRepository.findById(transaction.order_id)

        const translatedStatusForOrder = TransactionStatusToOrderStatus(newStatus)
        

        const response = await this.ordersRepository.updateOrderStatus({
            ...order,
            status: translatedStatusForOrder,
            updated_at: this.dateProvider.dateNow(),
        })
        
        return response     
        //integrar com pagar.me
        //processar regras de status


   
    }
}
export { PagarMePostBackUseCase }