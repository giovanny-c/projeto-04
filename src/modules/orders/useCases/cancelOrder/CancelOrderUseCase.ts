import { User } from "@modules/Accounts/entities/User"
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository"
import Order from "@modules/Orders/entities/Order"
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository"
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import {instanceToPlain, } from "class-transformer"

import { inject, injectable } from "tsyringe"

interface IProductforOrder {
    id: string
    quantity: number
}


interface IRequest {
    
    customer_id: string
    order_id: string
    // products: IProductforOrder[]
}

@injectable()
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

        if(order.status !== "PENDING" ){
            throw new AppError("This order was already on shiping, go to refound product", 400)
        }

        //adiciona os produtos que foram removidos na criaçao
        const {order_products} = order

        order_products.forEach(async (order_product) => {

            let product = await this.productsRepository.findById(order_product.product_id)
           
            product.quantity = Number(product.quantity) + Number(order_product.quantity)
           
            

            await this.productsRepository.save(product)
         })



        const status = "CANCELED" 
        const updated_at = this.dateProvider.dateNow()

        const canceledOrder = await this.ordersRepository.updateOrderStatus({id: order_id, status, updated_at})
         //del products da orders_products?
        //avisar o ou os vendedores sobre o cancelamento

        canceledOrder.customer = instanceToPlain(canceledOrder.customer) as User 

        return canceledOrder   
    }
}
 
export {CancelOrderUseCase}