import { User } from "@modules/Accounts/entities/User"

interface IProductforOrder{
    product_id: string
    price: number
    quantity: number
}


interface ISaveOrder {

    id?: string
    customer: User
    products: IProductforOrder[]

}

export {ISaveOrder, IProductforOrder}