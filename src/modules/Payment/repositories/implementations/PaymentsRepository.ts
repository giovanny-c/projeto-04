import ISavePaymentDTO from "@modules/Payment/dtos/ISavePaymentDTO";
import { Payment } from "@modules/Payment/entities/Payment";
import { dataSource } from "database";
import { Repository } from "typeorm";
import { IPaymentsRepository } from "../IPaymentsRepository";


class PaymentsRepository implements IPaymentsRepository{
    
    private repository: Repository<Payment>

    constructor(){
        this.repository = dataSource.getRepository(Payment)
    }

    async save({id, payment_info, user_id}: ISavePaymentDTO): Promise<Payment> {
        
        const payment = this.repository.create({
            id,
            user_id,
            payment_info
        })

        return await this.repository.save(payment)
        
    }
    async findById(id: string): Promise<Payment> {
        
        return await this.repository.findOneBy({id}) as Payment
    }
    async findByUserId(user_id: string): Promise<Payment[]> {

        return await this.repository.findBy({user_id})
    }

}