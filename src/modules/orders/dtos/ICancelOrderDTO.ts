import { OrderStatus } from "../types/OrderStatus";

export default interface ICancelOrder {
    id: string
    status: OrderStatus
    updated_at: Date
}