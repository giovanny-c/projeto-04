

interface ISaveProduct {

    id?: string
    name: string
    price: number
    old_price?: number
    vendor_id: string
    description: string
    quantity: number
    available: boolean
    created_at?: Date
    updated_at?: Date
    category_id?: string
    category?: string
    rating?: number
    votes?: number
    sells?: number   
    shape?: string
    weight?: number
    lenght?: number
    height?: number
    width?: number
    diameter?: number

}

interface IUpdateProductQuantity {
    id: string
    quantity: number
    add?: boolean
}
export { ISaveProduct, IUpdateProductQuantity }