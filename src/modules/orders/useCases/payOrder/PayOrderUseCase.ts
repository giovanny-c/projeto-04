import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
class PayOrderUseCase {


    constructor(@inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider){}


    async execute(order_id: string, user_id: string):Promise<void>{

        // const order = await this.ordersRepository.findById(order_id)
    }
}

export {PayOrderUseCase}