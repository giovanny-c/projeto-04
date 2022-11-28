import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Exclude} from "class-transformer"

@Entity("addresses")
class Address {

    @Exclude()
    @PrimaryColumn()
    id?: string

    @Column()
    address: string

    @Column()
    address_number: string

    
    @Column()
    neighborhood: string


    @Column()
    city: string

    
    @Column()
    state: string

    
    @Column()
    country: string

    
    @Column()
    zipcode: string

    
    @Column()
    user_id: string

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }


}

export { Address }



