import { OrderStatus } from "../types/OrderStatus";

export default interface IUpdateStatusOrder {
    id: string
    status: OrderStatus
    updated_at: Date
}