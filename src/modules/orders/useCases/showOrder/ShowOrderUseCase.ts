import Order from "@modules/orders/entities/Order";
import { OrdersRepository } from "@modules/orders/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { AppError } from "@shared/errors/AppError";
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

        return order
        
    }
}

export {ShowOrderUseCase}