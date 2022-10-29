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
}
interface IResponse{
    message: string,
    order: Order
}


@injectable()
class ProcessOrderUseCase { //MUDAR NOME PARA PROCESS ORDER ou algo parecido


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




    async execute({order}: IRequest):Promise<any>{


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

        
        if(!order.order_products || !order.order_products.length){

            order = await this.ordersRepository.findById(order.id)

        }
        
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
            
            
            const updated_at = this.dateProvider.dateNow()
    
            const response = await this.ordersRepository.updateOrderStatus({...order, status: "PROCESSING ORDER", updated_at })
            

            //Postback nao manda pro cliente,fazer o envio de email para o cliente, confirmando o pagamento e processamento
            // fazer o envio de email p/ client na transaction usecase e na postback como compra aprovada
            // fazer o envio de email p/ client na ProcessOrderUseCase como order processada
            
            return {
                message: "The paymet was approved and your order was sent to the vendor(s)",
                response
            }

            
        }
}

export {ProcessOrderUseCase}