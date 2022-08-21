import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Exclude } from "class-transformer"

@Entity("users")
class User {

    @PrimaryColumn()
    id?: string

    @Column()
    name: string

    @Column()
    email: string

    //@Exclude()//nao vai trazer a senha 
    @Column()
    password_hash: string

    @Column()
    salt: string

    @Column()
    is_confirmed: boolean

    @Column()
    is_logged: boolean

    @Column()
    admin: boolean

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }


}

export { User }