import { ISaveOrder } from "../dtos/ISaveOrderDTO"
import Order from "../entities/Order"
import IUpdateStatusOrder from "../dtos/IUpdateOrderStatusDTO"


interface IOrdersRepository {

    save(data: ISaveOrder): Promise<Order>
    findById(id: string): Promise<Order>
    findByCustomerId(customer_id: string): Promise<Order[]>
    findByVendorId(vendor_id: string): Promise<Order[]>
    findByIdAndVendorId(id: string, vendor_id: string): Promise<Order>
    updateOrderStatus(data: IUpdateStatusOrder): Promise<Order>
    


}

export {IOrdersRepository}