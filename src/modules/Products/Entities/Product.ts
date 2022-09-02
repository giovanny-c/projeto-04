

import { User } from "../../Accounts/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

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
    category_id?: string

    @Column()
    rating?: number

    @Column()
    votes?: number

    @Column()
    sells?: number


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Product }