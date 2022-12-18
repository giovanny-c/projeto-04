
export default interface IUpdateOrderValue {
    id: string
    total: number
    updated_at: Date
    shipping_confirmation?: boolean
}