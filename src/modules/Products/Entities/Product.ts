

import { User } from "../../Accounts/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Category } from "../../Categories/entities/Category";
import OrdersProducts from "../../Orders/entities/OrdersProducts";

@Entity("products")
class Product {

    @PrimaryColumn()
    id: string

    @Column()
    vendor_id: string

    @Column()
    name: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "vendor_id" })
    vendor?: User

    @Column()
    price: number

    @Column()
    old_price: number

    @Column()
    description: string

    @Column()
    quantity: number

    @Column()
    available: boolean

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @Column()
    category_id: string

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category


    @Column()
    rating: number

    @Column()
    votes: number

    @Column()
    sells: number

    @OneToMany(() => OrdersProducts, order_products => order_products.product)
    order_products: OrdersProducts[]


    @Column()
    shape: string

    @Column("decimal")
    weight: number

    @Column("decimal")
    lenght: number

    @Column("decimal")
    height: number

    @Column("decimal")
    width: number

    @Column("decimal")
    diameter: number

    


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Product }