import { Product } from "../entities/Product"



interface IProductResponse {


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
    category_id: string
    rating?: number
    votes?: number
    sells?: number
    files?: {
        id: string
        url: () => string
    }[]
    shape?: string
    weight: number
    lenght?: number
    height?: number
    width?: number
    diameter?: number



}

export { IProductResponse }

