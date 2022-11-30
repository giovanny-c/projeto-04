import { User } from "@modules/Accounts/entities/User";
import Order from "@modules/Orders/entities/Order";
import { OrdersRepository } from "@modules/Orders/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IShippingProvider } from "@shared/container/providers/shippingProvider/IShippingProvider";
import { AppError } from "@shared/errors/AppError";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string
}

interface IResponse {
    order: Order,
    tracking: any
}

@injectable()
class ShowOrderUseCase {
    
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("ShippingRepository")
        private shippingRepository: IShippingProvider
    ){
    }
    
    async execute({id: order_id}: IRequest): Promise<IResponse>{

        const order = await this.ordersRepository.findById(order_id)


        if(!order){
            throw new AppError("Order not found!", 400)
        }

        const tracking = await this.shippingRepository.orderTracking(order.tracking_code as string)

       //order.customer = instanceToPlain(order.customer) as User
        return {
            order,
            tracking
        }
        
    }
}

export {ShowOrderUseCase}