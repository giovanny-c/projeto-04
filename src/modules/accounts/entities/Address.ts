import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Exclude} from "class-transformer"
import { User } from "./User";

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

    //? vai funcionar assim ?
    @ManyToOne(()=> User) 
    @JoinColumn({name: "user_id"})
    user_id: string

    @Column()
    default_address: boolean


    

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }


}

export { Address }



