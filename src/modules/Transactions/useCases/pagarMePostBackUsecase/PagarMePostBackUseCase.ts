

import { inject, injectable } from "tsyringe";

import {IOrdersRepository}  from "@modules/Orders/repositories/IOrdersRepository"
import { ITransactionsRepository } from "@modules/Transactions/repositories/ITransactionsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { ITransactionProvider } from "@shared/container/providers/transactionProvider/ITransactionProvider";
import TransactionStatusToOrderStatus from "@modules/Orders/mapper/TransactionStatusToOrderStatus";
import Order from "@modules/Orders/entities/Order";
import { resolve } from "path";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";

interface IRequest {

    transaction_id: string, object: string, current_status: string
}


interface IStatusResponse{
    status: number
}

@injectable()
class PagarMePostBackUseCase {


    constructor(
        
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("TransactionsRepository")
        private transactionsRepository: ITransactionsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider ,
        @inject("TransactionProvider")
        private transactionProvider: ITransactionProvider,
        @inject("MailProvider")
        private mailProvider: IMailProvider,
    ) { }

    async execute({current_status, object, transaction_id}: IRequest): Promise< Order | IStatusResponse > {
        
        ///////////////////////////////////
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
        const order = await this.ordersRepository.findById(transaction.order_id)

        const translatedStatusForOrder = TransactionStatusToOrderStatus(newStatus)
        

        const response = await this.ordersRepository.updateOrderStatus({
            ...order,
            status: translatedStatusForOrder,
            updated_at: this.dateProvider.dateNow(),
        })
        

        const templatePath = resolve(__dirname, "..", "..", "..", "..", "..", "views", "accounts", "emails", "orderPaymentConfirmation.hbs")
        const linkToOrder = `${process.env.APP_API_URL}${process.env.URL_CUSTOMER_ORDER as string}${order.id}`
        
        await this.mailProvider.sendMail({
            to: order.customer.email,
            subject: `Seu pagamento para o pedido: ${order.id}, foi aprovado! ` ,
            variables: {
                order,
                link: linkToOrder
            },
            path: templatePath,
        })

        
        return response
        


   
    }
}
export { PagarMePostBackUseCase }