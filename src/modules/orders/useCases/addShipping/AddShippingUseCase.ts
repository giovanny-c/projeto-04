

import { User } from "@modules/Accounts/entities/User";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import Order from "@modules/Orders/entities/Order";
import { OrdersRepository } from "@modules/Orders/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { Service, Shape } from "@shared/container/providers/shippingProvider/dtos/ShippingDTOs";
import { IShippingProvider } from "@shared/container/providers/shippingProvider/IShippingProvider";
import { AppError } from "@shared/errors/AppError";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { inject, injectable } from "tsyringe";

interface IRequest {
    order_id: string
    user_id: string
    type_of_service: string

}


@injectable()
class ShowOrderUseCase {
    
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
        @inject("AddressesRepository")
        private addressesRepository: IAddressesRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository, 
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
        @inject("ShippingRepository")
        private shippingRepository: IShippingProvider
    ){
    }
    
    async execute({order_id, user_id, type_of_service }: IRequest): Promise<any>{

        const order = await this.ordersRepository.findById(order_id)

        if(order.customer_id !== user_id){
                    throw new AppError("You cant chage this", 401)
                    
        }

        const address = await this.addressesRepository.findUserDefaultAddress(user_id)

        if(!address){

            return {

                message: "You need to add an address first",
                redirect: `${process.env.APP_API_URL}${process.env.URL_CUSTOMER_ADD_ADDRESS}`
            }

        }


        let shipping_total_value = 0

        //calcula o preço do frete de cada produto
        let shipping_for_products = await Promise.all(order.order_products.map(async (order_product)=> {

            const product = await this.productsRepository.findById(order_product.product_id)

            const vendor_address = await this.addressesRepository.findUserDefaultAddress(product.vendor_id)

            const shipping_for_product = await this.shippingRepository.calculatePriceAndDeliveryTime({
                customerZipcode: address.zipcode,
                productDiameter: product.diameter,
                productHeight: product.height,
                productLenght: product.lenght,
                productShape: product.shape as Shape,
                productWeight: product.weight,
                productWidth: product.weight,
                typeOfService: [type_of_service as Service],
                vendorFacilityZipcode: vendor_address.zipcode
            })

            let shipping_total_for_product = Number(shipping_for_product.Valor) * order_product.quantity as number

            shipping_total_value += shipping_total_for_product 

            return {
                product,
                shipping_for_product,
                shipping_total_for_product,
            }

        }))

        
        

        const addShippingToOrder = await this.ordersRepository.updateOrderValue({
            id: order.id,
            total: shipping_total_value,
            updated_at: this.dateProvider.dateNow()
        })

// SEPARAR OS PRODUTOS PARA CADA VENDEDOR X PARECIDO COM O SAVEORDER
//PARA FAZER OS PRAZOS DE ENTREGA
        let shipping_filtered_by_vendor
        
        shipping_for_products.forEach((shipping_for_product, index)=> {

            
            if(shipping_filtered_by_vendor.includes(shipping_for_product.product.vendor_id)){
                shipping_filtered_by_vendor.push(shipping_for_product.product.vendor_id)
            }

            


        }) 
/////////////////

        return {
            total: addShippingToOrder.total,
            order,
            shipping_for_products
        }
        
        
    }
}

export {ShowOrderUseCase}