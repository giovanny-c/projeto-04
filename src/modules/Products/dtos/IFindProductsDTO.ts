

interface IFindProducts {

    search_query?: string
    vendor_name?: string
    vendor_id?: string
    price_range?: number[]
    order_by?: {
        sort?: "updated_at" | "rating" | "sells"
        order?: "ASC" | "DESC"
    }
    limit?: number
    offset?: number
    available?: boolean
    category_id?: string

}

interface IFindProductsById{
    id: string
}

export { IFindProducts, IFindProductsById }