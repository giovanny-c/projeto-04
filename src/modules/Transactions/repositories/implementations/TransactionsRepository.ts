import ISaveTransaction from "@modules/Transactions/dtos/ISaveTransactionDTO";
import { Transaction } from "@modules/Transactions/entities/Transaction";
import { dataSource } from "database";
import { Repository } from "typeorm";
import { ITransactionsRepository } from "../ITransactionsRepository";


class TransactionsRepository implements ITransactionsRepository{
    
    private repository: Repository<Transaction>

    constructor(){
        this.repository = dataSource.getRepository(Transaction)
    }

    async save({id, 
        transaction_id,
        transaction_code, 
        payment_type, 
        processor_response, 
        status, 
        total, 
        installments, 
        vendor_id,
        customer_id, 
        customer_email, 
        customer_name, 
        customer_document, 
        customer_mobile, 
        billing_address, 
        billing_city, 
        billing_neighborhood, 
        billing_number, 
        billing_state, 
        billing_zipcode, 
        created_at, 
        updated_at, 
    }: ISaveTransaction): Promise<Transaction> {
        
        const Transaction = this.repository.create({
            id,
            transaction_code,
            transaction_id,
            payment_type,
            processor_response,
            status,
            total,
            installments,
            vendor_id,
            customer_id,
            customer_document,
            customer_email, 
            customer_mobile,
            customer_name,
            billing_address,
            billing_city, 
            billing_neighborhood,
            billing_number,
            billing_state, 
            billing_zipcode,
            updated_at,
            created_at, 

        })

        return await this.repository.save(Transaction)
        
    }
    async findById(id): Promise<Transaction> {
        
        return await this.repository.findOneBy({id}) as Transaction
    }

    async findByUserId(customer_id): Promise<Transaction[]> {

        return await this.repository.findBy(customer_id)
    }

}

export {TransactionsRepository}