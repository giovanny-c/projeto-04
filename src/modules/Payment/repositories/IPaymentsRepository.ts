import ISavePayment from "../dtos/ISavePaymentDTO"
import { Payment } from "../entities/Payment"


interface IPaymentsRepository{

    save(data: ISavePayment): Promise<Payment>
    findById(id: string): Promise<Payment>
    findByUserId(user_id: string): Promise<Payment[]>
}

export {IPaymentsRepository}