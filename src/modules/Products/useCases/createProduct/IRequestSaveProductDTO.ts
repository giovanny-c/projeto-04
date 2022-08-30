

interface IRequestSaveProduct {

    id?: string
    name: string
    price: number
    old_price?: number
    vendor_id: string
    description: string
    quantity: number
    available: string
    created_at?: Date
    updated_at?: Date

}

export { IRequestSaveProduct }