

import { User } from "@modules/Accounts/entities/User";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import Order from "@modules/Orders/entities/Order";
import { OrdersRepository } from "@modules/Orders/repositories/implementations/OrdersRepository";
import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IShippingProvider } from "@shared/container/providers/shippingProvider/IShippingProvider";
import { AppError } from "@shared/errors/AppError";
import { instanceToInstance, instanceToPlain } from "class-transformer";
import { PrecoPrazoResponse } from "correios-brasil/dist";
import { response } from "express";
import { string } from "joi";
import { inject, injectable } from "tsyringe";

interface IRequest {
    order_id: string
    user_id: string
    type_of_service: string[]

}

interface IResponse {

    order: Order,
    shipping_filtered_by_vendor: any[]
}


@injectable()
class AddShippingUseCase {
    
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
        @inject("ShippingProvider")
        private shippingProvider: IShippingProvider
    ){
    }
    
    async execute({order_id, user_id, type_of_service }: IRequest): Promise<IResponse>{

        const order = await this.ordersRepository.findById(order_id)

        if(order.customer_id !== user_id){
                    throw new AppError("You cant chage this", 401)
                    
        }

        const address = await this.addressesRepository.findUserDefaultAddress(user_id)

        if(!address){
                throw new AppError(`You need to add an address first:  ${process.env.APP_API_URL}${process.env.URL_CUSTOMER_ADD_ADDRESS}`, 401)

        }

    
        let shipping_total_value: number = 0

        //calcula o preço do frete de cada produto
        let shipping_for_products = await Promise.all(order.order_products.map(async (order_product)=> {

            const product = await this.productsRepository.findById(order_product.product_id)

            const vendor_address = await this.addressesRepository.findUserDefaultAddress(product.vendor_id)

            const shipping_for_product = await this.shippingProvider.calculatePriceAndDeliveryTime({
                customerZipcode: address.zipcode,
                productDiameter: product.diameter,
                productHeight: product.height,
                productLenght: product.lenght,
                productShape: product.shape,
                productWeight: product.weight,
                productWidth: product.width,
                typeOfService: type_of_service,
                vendorFacilityZipcode: vendor_address.zipcode
            })

            
            let sfpValor = Number(shipping_for_product[0].Valor.replace(".", "").replace(",","."))

            console.log(sfpValor)

            let shipping_total_for_product: number = sfpValor * order_product.quantity as number

            shipping_total_value += shipping_total_for_product 
            

            return {
                product,
                shipping_for_product,
                shipping_total_for_product,
            }

        }))

        
        
// adiciona no valor total da order
        const addShippingToOrder = await this.ordersRepository.updateOrderValue({
            id: order.id,
            total: shipping_total_value,
            updated_at: this.dateProvider.dateNow()
        })


///////////////// filtra os vendor ids, para so ter 1 de cada /////////
        let filtered_vendors: string[] = []

        shipping_for_products.forEach(sfp => {

            if(!filtered_vendors.find(vendor_id => vendor_id === sfp.product.vendor_id)){

              filtered_vendors.push(sfp.product.vendor_id)  
            }

            
        })


        
///////////////////// poe cada sfp dentro com seu vendor correspondente //////////////       
        let shipping_filtered_by_vendor: any[] = [] 
        
        filtered_vendors.forEach(vendor_id => {


            let sFPs = shipping_for_products.map(sfp => {


                if(vendor_id === sfp.product.vendor_id){
                    
                    return sfp
                }

            })

            shipping_filtered_by_vendor.push({
                vendor_id,
                vendor: sFPs[0]?.product.vendor || "some name",
                shipping_products: sFPs,
                //deadline: sFPs[0]?.shipping_for_product.PrazoEntrega
            })


        })

        /* oq tem que vir
            [
                {
                    vendor_id,
                    shipping_products [
                        {
                            prod 1 
                        },
                        {
                            prod 2
                        }
                    ]
                },
                {
                    vendor_id, shipping_products[{p1}, {p2}]
                }
            ]
        
        */


/////////////////////////////////////////////////////

        const responseOrder: Order = {

            ...order,
            

        }

        return {
           // total: addShippingToOrder.total,
            order: {
                ...order,
                total: addShippingToOrder.total,
                updated_at: addShippingToOrder.updated_at
            },
            shipping_filtered_by_vendor
        }
        
        
    }
}

export {AddShippingUseCase}