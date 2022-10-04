import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository"
import Order from "@modules/orders/entities/Order"
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository"
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface IProductforOrder {
    id: string
    quantity: number
}


interface IRequest {
    order_id?: string
    customer_id: string
    products: IProductforOrder[]
}

injectable()
class SaveOrderUseCase {

    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ){

    }

    async execute({customer_id, products, order_id}: IRequest): Promise<Order>{
        //costumer validations
        const customerExists = await this.usersRepository.findById(customer_id)

        if(!customerExists){
            throw new AppError("Customer not found!", 400)
        }

        //products validations
        const foundProducts = await this.productsRepository.findAllByIds(products)

        if(!foundProducts.length){
            throw new AppError("Could not find any products", 400)
        }

        //if products exists
        const existingProductsIds = foundProducts.map(product => product.id)

        const checkUnexistingProducts = products.filter(
            product => !existingProductsIds.includes(product.id)
            //retorna só os ids que nao estao em existing products
        )

        if(checkUnexistingProducts.length){
            throw new AppError(`Could not find product ${checkUnexistingProducts[0].id}`, 400)
        }

        //product not available
        const productsUnavailable = products.filter(
            product => foundProducts.filter(p => p.id === product.id)[0].available === false
        ) 

        if(productsUnavailable.length){
            const product = await this.productsRepository.findById(productsUnavailable[0].id)
            
            throw new AppError(`This product: ${product.name}, is not available at the moment`, 400)

        }

        // quantity not available
        const quantityAvailable = products.filter(
            product => foundProducts.filter(p => p.id === product.id)[0].quantity < product.quantity
            )

        if(quantityAvailable.length){

            const product = await this.productsRepository.findById(quantityAvailable[0].id)

            throw new AppError(`We do not have ${quantityAvailable[0].quantity} of this product: ${product.name}, available at the moment`, 400)
        }

        //save order
        const availableProducts = products.map(product => ({

            product_id: product.id,
            quantity: product.quantity,
            price: foundProducts.filter(p => p.id === product.id)[0].price
        }))

        const order = await this.ordersRepository.save({
            id: order_id,
            customer: customerExists,
            products: availableProducts
        })

        //subtract the products quantities
        const {order_products} = order

        const updateProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity: foundProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }))

        await this.productsRepository.saveMany(updateProductQuantity)

        return order
    }
}

export {SaveOrderUseCase}