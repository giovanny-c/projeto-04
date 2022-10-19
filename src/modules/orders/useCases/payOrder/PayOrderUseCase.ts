import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IPaymentsRepository } from "@modules/Payment/repositories/IPaymentsRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { OrderStatus } from "aws-sdk/clients/outposts";
import { inject, injectable } from "tsyringe";


interface IRequest{
    order_id: string
    user_id: string
    payment_validation: boolean
}


@injectable()
class PayOrderUseCase {


    constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
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



        let vendors_ids = order.order_products.map(order_product => {


            return order_product.product.vendor_id

        })


        let products = order.order_products.map(order_product => {

            return order_product.product

        })

        
        let vendors
        
        for (let index = 0; index < products.length; index++) {
            
            vendors = products.filter(p => p.vendor_id === vendors_ids[index])
        
        
        }
        //array 
        //{vendor:
        //  vendor_id e vendor_name
        // products: [{products}]
        //}

        return vendors

        // await this.mailProvider.sendMail({
        //     to: email,
        //     subject: "Recuperação de senha",
        //     variables,
        //     path: templatePath
        // })




        
       
    }
}

export {PayOrderUseCase}