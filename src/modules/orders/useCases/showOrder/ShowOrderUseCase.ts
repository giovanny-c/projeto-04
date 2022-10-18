import { User } from "@modules/Accounts/entities/User";
import Order from "@modules/Orders/entities/Order";
import { OrdersRepository } from "@modules/Orders/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { AppError } from "@shared/errors/AppError";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string
}

@injectable()
class ShowOrderUseCase {
    
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository
    ){
    }
    
    async execute({id: order_id}: IRequest): Promise<Order>{

        const order = await this.ordersRepository.findById(order_id)

        if(!order){
            throw new AppError("Order not found!", 400)
        }

        order.customer = instanceToPlain(order.customer) as User
        return order
        
    }
}

export {ShowOrderUseCase}