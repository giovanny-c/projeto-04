import Order from "@modules/orders/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";


interface IRequest{
    customer_id: string
}

@injectable()
class ShowCustomersOrdersUseCase {

    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
        ){}

    async execute({customer_id}: IRequest): Promise<Order[]>{
        
        return await this.ordersRepository.findByCustomerId(customer_id)
    }

}

export {ShowCustomersOrdersUseCase}