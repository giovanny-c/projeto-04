

interface ISaveProduct {

    id?: string
    price: number
    old_price?: number
    vendor_id: string
    description: string
    quantity: number
    available: boolean
    created_at?: Date
    updated_at?: Date

}

export { ISaveProduct }