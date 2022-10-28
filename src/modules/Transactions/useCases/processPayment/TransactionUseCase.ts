

import { inject, injectable } from "tsyringe";


import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import {IOrdersRepository}  from "@modules/Orders/repositories/IOrdersRepository"
import { ITransactionsRepository } from "@modules/Transactions/repositories/ITransactionsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { Transaction } from "@modules/Transactions/entities/Transaction";
import IBilling from "@modules/Transactions/dtos/IBillingDTO";
import ICard from "@modules/Transactions/dtos/ICardDTO";
import ICustomerForTransaction from "@modules/Transactions/dtos/ICustomerForTransactionDTO";
import { ITransactionProvider } from "@shared/container/providers/transactionProvider/ITransactionProvider";

import {v4 as uuidv4} from "uuid"
import { cpf, cnpj } from "cpf-cnpj-validator";
import Order from "@modules/Orders/entities/Order";
import TransactionStatusToOrderStatus from "@modules/Orders/mapper/TransactionStatusToOrderStatus";

interface IRequest {

    order_id: string
    payment_type: string
    installments: number
    customer: ICustomerForTransaction
    billing: IBilling
    card: ICard
}


@injectable()
class TransactionUseCase {


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

    async execute({order_id, billing, card, customer, installments, payment_type}: IRequest): Promise<Order> {
        
        

        const order = await this.ordersRepository.findById(order_id)

        if(!order){
            throw new AppError("Order not found", 404)
        }

        if(order.status !== "PENDING" && order.status !== "PAYMENT REFUSED"){
            throw new AppError("This order is either processing the payment or was already paid")
        }


        
        const date_now = this.dateProvider.dateNow()

        //cria a transaction
        const transaction = await this.transactionsRepository.save({
            transaction_code: uuidv4(), 
            transaction_id: "", 
            total: order.total,
            payment_type,
            installments,
            status: "started",
            processor_response: "",
            order_id,
            customer_id: customer.id,
            customer_email: customer.email,
            customer_name: customer.name,
            customer_mobile: customer.mobile,
            customer_document: customer.document,
            billing_address: billing.address,
            billing_number: billing.number,
            billing_neighborhood: billing.neighborhood,
            billing_city: billing.city,
            billing_state: billing.state,
            billing_zipcode: billing.zipcode,
            created_at: date_now,
            updated_at: date_now
        })

        //manda ela para o provider (pagarme)
        const providerResponse = await this.transactionProvider.proccess({
            transaction_code: transaction.transaction_code,
            total: transaction.total,
            payment_type,
            installments, 
            customer,
            card,
            billing,
            items: order.order_products,
        })

        //pega a resposta do provider e poe no transaction
        await this.transactionsRepository.save({
            ...transaction,
            transaction_id: providerResponse.transaction_id,
            status: providerResponse.status,
            updated_at: this.dateProvider.dateNow(),
            processor_response: providerResponse.processorResponse
        })

        
        
        let response: Order
        //atualiza o status da order 
        //(fazer um mapper para order status igual o do provider?)

        const translatedStatusForOrder = TransactionStatusToOrderStatus(providerResponse.status)

        response = await this.ordersRepository.updateOrderStatus({id: order.id, status: translatedStatusForOrder , updated_at: this.dateProvider.dateNow(),})

        // if(providerResponse.status === "approved"){

        //    response = await this.ordersRepository.updateOrderStatus({id: order.id, status:"PAYMENT ACEPPTED", updated_at: this.dateProvider.dateNow(),})
        // }
        // if(providerResponse.status === "processing" ){

        //    response = await this.ordersRepository.updateOrderStatus({id: order.id, status:"PROCESSING PAYMENT", updated_at: this.dateProvider.dateNow(),})

        // }
        // if(providerResponse.status === "refused"){

        //    response = await this.ordersRepository.updateOrderStatus({id: order.id, status:"PAYMENT REFUSED", updated_at: this.dateProvider.dateNow(),})

        // }
        // else{ //providerResponse.status === "pending"
            
        //    response = await this.ordersRepository.updateOrderStatus({id: order.id, status:"PENDING", updated_at: this.dateProvider.dateNow(),})
        // }

        
        

        
        return response
        //integrar com pagar.me
        //processar regras de status


   
    }
}
export { TransactionUseCase }