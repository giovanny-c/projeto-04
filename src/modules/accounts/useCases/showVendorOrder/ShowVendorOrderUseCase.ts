import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import Order from "@modules/Orders/entities/Order";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    order_id: string 
    vendor_id: string
}

@injectable()
class ShowVendorOrdersUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,

    ) { }

    async execute({order_id, vendor_id}: IRequest): Promise<Order> {

        return await this.ordersRepository.findByIdAndVendorId(order_id, vendor_id)

        
    }
}

export {ShowVendorOrdersUseCase}