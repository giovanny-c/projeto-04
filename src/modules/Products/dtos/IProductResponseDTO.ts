import { Product } from "../entities/Product"



interface IProductResponse {

    product: {
        id: string
        vendor_id: string
        name: string
        price: number
        old_price: number
        description: string
        quantity: number
        available: boolean
        created_at: Date
        updated_at: Date
        files: {
            id: string
            url: () => string
        }[]
    }




}

export { IProductResponse }

