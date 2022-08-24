

import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

@Entity("Products")
class Product {

    @PrimaryColumn()
    id: string

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


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }
}

export { Product }