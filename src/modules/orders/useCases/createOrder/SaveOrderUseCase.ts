import { User } from "@modules/Accounts/entities/User"
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository"
import Order from "@modules/Orders/entities/Order"
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository"
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository"
import ICacheProvider from "@shared/container/providers/cacheProvider/ICacheProvider"
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"
import { instanceToPlain } from "class-transformer"
import { inject, injectable } from "tsyringe"
import { validate } from "uuid"

interface IProductforOrder {
    id: string
    quantity: number
}


interface IRequest {
    
    customer_id: string
    // products: IProductforOrder[]
}

@injectable()
class SaveOrderUseCase {

    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
        @inject("CacheProvider")
        private cacheProvider: ICacheProvider,
    ){

    }

    async execute({customer_id}: IRequest): Promise<Order>{

        const cart = await this.cacheProvider.getCart(customer_id) as []

        const products_ids = cart.filter(value => validate(value))
        const quantities = cart.filter(value => !validate(value))

        let products: IProductforOrder[] = [] 

        for (let index = 0; index < products_ids.length; index++) {
            
            
            products.push({
                id: products_ids[index],
                quantity: Number(quantities[index])
            })
        }
        

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
            price: foundProducts.filter(p => p.id === product.id)[0].price,
            created_at: this.dateProvider.dateNow(),
            updated_at: this.dateProvider.dateNow(),
        }))


        let totalValue = 0

        availableProducts.forEach(product => {

            totalValue += product.price * product.quantity
        })

        console.log(totalValue)

        const order = await this.ordersRepository.save({
            customer: customerExists,
            products: availableProducts,
            status: "PENDING",
            created_at: this.dateProvider.dateNow(),
            updated_at: this.dateProvider.dateNow(),
            total: totalValue
        })

        //subtract the products quantities
        const {order_products} = order

        const updateProductQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity: foundProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
        }))

        await this.productsRepository.saveMany(updateProductQuantity)

        await this.cacheProvider.delCart(customer_id)

        order.customer = instanceToPlain(order.customer) as User 

        return order
    }
}
 
export {SaveOrderUseCase}