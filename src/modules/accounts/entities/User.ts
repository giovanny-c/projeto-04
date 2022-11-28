import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Exclude} from "class-transformer"
import { Address } from "./Address";

@Entity("users")
class User {

    @Exclude()
    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    @Exclude()//nao vai trazer a senha
    @Column()
    password_hash: string

    @Exclude()
    @Column()
    salt: string

    @Exclude()
    @Column()
    is_confirmed: boolean

    @Exclude()
    @Column()
    is_logged: boolean

    @Exclude()
    @Column()
    admin: boolean

    @Column()
    address_id: string

    @ManyToOne(() => Address)
    @JoinColumn({name: "address_id"})
    address: Address


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }


}

export { User }