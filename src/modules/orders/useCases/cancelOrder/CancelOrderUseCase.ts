import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository"
import Order from "@modules/orders/entities/Order"
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository"
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository"
import { delCart, getCart } from "@shared/cache/redisCache"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import { object } from "joi"
import { inject, injectable } from "tsyringe"
import { validate } from "uuid"

interface IProductforOrder {
    id: string
    quantity: number
}


interface IRequest {
    
    customer_id: string
    order_id: string
    // products: IProductforOrder[]
}

injectable()
class CancelOrderUseCase {

    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider
    ){

    }

    async execute({customer_id, order_id}: IRequest): Promise<Order>{

    
        //costumer validations
        const customerExists = await this.usersRepository.findById(customer_id)

        if(!customerExists){
            throw new AppError("Customer not found!", 400)
        }


        const order = await this.ordersRepository.findById(order_id)

        if(order.status !== "PENDING" || "PROCESSING" || "PICKING" ){
            throw new AppError("This order was already on shiping, go to refound product", 400)
        }

        //adiciona os produtos que foram removidos na criaçao
        order.order_products.forEach(async (product) => {

            // const prod = await this.productsRepository.findById(product.id)

            // prod.quantity = prod.quantity + product.quantity

            const prod = Object.assign({
                id: product.id,
                quantity: + product.quantity //?sera que funciona
            })

            await this.productsRepository.save(prod)
         })

        const status = "CANCELED" 
        const updated_at = this.dateProvider.dateNow()

        await this.ordersRepository.cancelOrder({id: order_id, status, updated_at})

        //avisar o ou os vendedores sobre o cancelamento

        return order
    }
}
 
export {CancelOrderUseCase}