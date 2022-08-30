

interface IRequestListProducts {

    search_query?: string
    vendor_name?: string
    vendor_id?: string
    price_range?: number[]
    order_by?: {
        sort: "updated_at" | "sells" | "rating"
        order: "ASC" | "DESC"
    }
    limit?: number
    offset?: number
    available?: boolean
}

export { IRequestListProducts }