import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import Order from "@modules/Orders/entities/Order";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { inject, injectable } from "tsyringe";



@injectable()
class ShowVendorOrdersUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,

    ) { }

    async execute(vendor_id): Promise<Order[]> {

        return await this.ordersRepository.findByVendorId(vendor_id)

        
    }
}

export {ShowVendorOrdersUseCase}