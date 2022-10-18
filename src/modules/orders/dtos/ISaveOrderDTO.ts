import { User } from "@modules/Accounts/entities/User"
import { OrderStatus } from "../types/OrderStatus"

interface IProductforOrder{
    product_id: string
    price: number
    quantity: number
}


interface ISaveOrder {

    id?: string
    customer: User
    products: IProductforOrder[]
    status: OrderStatus
    created_at?: Date
    updated_at?: Date
    total: number
}

export {ISaveOrder, IProductforOrder}