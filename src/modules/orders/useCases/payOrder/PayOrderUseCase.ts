import { User } from "@modules/Accounts/entities/User";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import OrdersProducts from "@modules/Orders/entities/OrdersProducts";

import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";


interface IRequest{
    order_id: string
    user_id: string
    payment_validation: boolean
}


@injectable()
class PayOrderUseCase {


    constructor(
    
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    ){}




    async execute({order_id, user_id, payment_validation}: IRequest):Promise<any>{

        

        const order = await this.ordersRepository.findById(order_id)

        if(order.status !== "PENDING"){

            if(order.status === "CANCELED"){
                throw new AppError("This order was canceled!", 400)
            }
            
            throw new AppError("This order was already payed", 400)
        }        

        if(order.customer_id !== user_id){

            throw new AppError("Order not found! user differs from customer", 400)
        }

        if(!payment_validation){
            throw new AppError("A error ocurred with your payment", 400)
        }
        

        const updated_at = this.dateProvider.dateNow()

        await this.ordersRepository.updateOrderStatus({id: order_id, status: "PROCESSING", updated_at })


        //pega todos os vendedores
        let vendors = order.order_products.map(order_product => {
            

            return order_product.product.vendor as User

        })

       //remove os duplices
        let filtered_vendors: User[] = []
            
        vendors.forEach((vendor) => {

            
            if (!filtered_vendors.find(v => v.id === vendor.id)) {
                
                filtered_vendors.push(vendor)
                
            }
        })


        const templatePath = resolve(__dirname, "..", "..", "..", "..", "..", "views", "accounts", "emails", "orderToVendor.hbs")
        const linkToOrder = `${process.env.APP_API_URL}${process.env.URL_VENDOR_ORDER as string}`
        

        //poe todos os produtos nos seus respectivos vendedores
        filtered_vendors.forEach(async (vendor, index) => {
            
            let vendor_products = order.order_products.filter(op => 
                op.product.vendor?.id === filtered_vendors[index].id     
            )

            

            await this.mailProvider.sendMail({
                to: vendor.email,
                subject: `Pedido ${vendor_products[0].order_id}`,
                variables: {
                    vendor,
                    products: vendor_products,
                    link: `${linkToOrder}${vendor_products[0].order_id}`
                },
                path: templatePath
                })
            

        })

    
       
    }
}

export {PayOrderUseCase}