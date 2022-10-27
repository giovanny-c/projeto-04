

import { inject, injectable } from "tsyringe";

import axios from 'axios';

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

    async execute({order_id, billing, card, customer, installments, payment_type}: IRequest): Promise<Transaction> {
        
        

        const order = await this.ordersRepository.findById(order_id)

        if(!order){
            throw new AppError("Order not found", 404)
        }

        if(order.status !== "PENDING"){
            throw new AppError("This order is either processing the payment or was already paid")
        }


        //criar transaction
        const date_now = this.dateProvider.dateNow()

        const transaction = await this.transactionsRepository.save({
            transaction_code: uuidv4(), 
            transaction_id: "?", //deletar
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

        await this.transactionProvider.proccess({
            transaction_code: transaction.transaction_code,
            total: transaction.total,
            payment_type,
            installments, 
            customer,
            card,
            billing,
            items: order.order_products,
        })

        await this.ordersRepository.updateOrderStatus({id: order.id, status:"PROCESSING PAYMENT", updated_at: date_now})

        
        return transaction
        //integrar com pagar.me
        //processar regras de status


   
    }
}
export { TransactionUseCase }