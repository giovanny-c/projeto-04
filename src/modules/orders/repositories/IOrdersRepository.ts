import { ISaveOrder } from "../dtos/ISaveOrderDTO"
import Order from "../entities/Order"


interface IOrdersRepository {

    save(data: ISaveOrder): Promise<Order>
    findById(id: string): Promise<Order>
    findByCustomerId(customer_id: string): Promise<Order[]>
    

}

export {IOrdersRepository}