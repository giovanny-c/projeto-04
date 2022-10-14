import { User } from "@modules/Accounts/entities/User";
import Order from "@modules/orders/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { instanceToInstance, instanceToPlain } from "class-transformer";
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
        
        const orders = await this.ordersRepository.findByCustomerId(customer_id)
        
        orders.forEach(order => {
            order.customer = instanceToPlain(order.customer) as User
        });

        return orders
    }

}

export {ShowCustomersOrdersUseCase}