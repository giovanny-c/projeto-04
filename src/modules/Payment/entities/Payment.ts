import { Column, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidV4} from "uuid"


@Entity("payments")
class Payment {

    @PrimaryColumn()
    id: string

    @Column()
    user_id: string

    @Column()
    payment_info: string

    constructor(){
        if(!this.id){
            this.id = uuidV4()
        }
    }

}

export {Payment}