import { Product } from "../../Products/entities/Product"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"
import Order from "./Order"
import { v4 as uuidV4 } from "uuid"

@Entity("orders_products")
class OrdersProducts {
    @PrimaryColumn()
    id: string

    @Column()
    order_id: string

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: "order_id" })
    order: Order

    @Column()
    product_id: string

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: "product_id" })
    product: Product

    @Column("decimal")
    price: number

    @Column("int")
    quantity: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export default OrdersProducts
