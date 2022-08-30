

interface IFindProducts {

    search_query?: string
    vendor_name?: string
    vendor_id?: string
    price_range?: number[]
    order_by?: {
        sort: string
        order: "ASC" | "DESC"
    }
    limit?: number
    offset?: number
    available?: boolean
}

export { IFindProducts }