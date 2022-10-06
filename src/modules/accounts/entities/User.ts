import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Exclude} from "class-transformer"

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

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }


}

export { User }