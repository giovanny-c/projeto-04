import { User } from "@modules/Accounts/entities/User";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import Order from "@modules/Orders/entities/Order";
import OrdersProducts from "@modules/Orders/entities/OrdersProducts";

import { IOrdersRepository } from "@modules/Orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";


interface IRequest{
    order: Order
    user_id: string
    payment_validatior: boolean
}


@injectable()
class PayOrderUseCase { //MUDAR NOME PARA PROCESS ORDER ou algo parecido


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




    async execute({order, user_id, payment_validatior}: IRequest):Promise<any>{

        //pensar sobre a segurança dessa rota ? usar o processor response ?
//if("PAYMENT ACCEPTD") passar pra ca na rota quando for paga?
// REFAZER ATÉ...

        if(order.status !== "PAYMENT ACCEPTED"){


            if(order.status === "PROCESSING PAYMENT"){
                throw new AppError("The payment of this order is still processing!", 401)
            }

            if(order.status === "PENDING"){
                throw new AppError("Awaiting payment confirmation", 401)
            }

            if(order.status === "PAYMENT REFUSED"){
                throw new AppError("The payment for this order was refused", 401)
            }
            
            throw new AppError("There is an error with this order, or it is already paid", 401)
        }        

        
        if(!payment_validatior){
            throw new AppError("A error ocurred with your payment", 400)
        }
        
        
// ...AQUI
        const updated_at = this.dateProvider.dateNow()

        await this.ordersRepository.updateOrderStatus({id: order.id, status: "PROCESSING ORDER", updated_at })


        //pega todos os vendedores
        let vendors = order.order_products.map(order_product => {
            

            return order_product.product.vendor as User

        })

        //const map_filtered_vendors = new Map(vendors)
        // teria só valores unicos?
       
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