import { User } from "@modules/Accounts/entities/User";
import Order from "@modules/Orders/entities/Order";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IShippingProvider } from "@shared/container/providers/shippingProvider/IShippingProvider";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";


interface IRequest{
    customer_id: string
}

interface IResponse {
    order: Order,
    tracking: any
}


@injectable()
class ShowCustomersOrdersUseCase {

    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("ShippingRepository")
        private shippingRepository: IShippingProvider
        ){}

    async execute({customer_id}: IRequest): Promise<IResponse[]>{
        
        const orders = await this.ordersRepository.findByCustomerId(customer_id)
        


        const orders_with_tracking = await Promise.all(orders.map(async (order) => {
            
            const tracking = await this.shippingRepository.orderTracking(order.tracking_code as string)

            order.customer = instanceToPlain(order.customer) as User
            
            return {
                order,
                tracking
            }
            

            
        }))

        

        return orders_with_tracking as IResponse[]
    }

}

export {ShowCustomersOrdersUseCase}