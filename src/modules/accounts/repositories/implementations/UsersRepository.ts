
import { Repository } from "typeorm";
import { dataSource } from "../../../../database";
import { ISaveUserDTO } from "../../dtos/ISaveUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>

    constructor() {
        this.repository = dataSource.getRepository(User)
    }
    



    //voltar a criar id pelo app
    async save({ id, name, email, password_hash, salt, is_confirmed, admin = false }: ISaveUserDTO): Promise<User> {

        const user = this.repository.create({
            id,
            name,
            email,
            password_hash,
            salt,
            is_confirmed,
            admin
        })

        await this.repository.save(user)

        return user //nao retornar infos sensiveis
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOneBy({ id })

        return user as User
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({ email })

        return user as User
    }
    
    async findAddressById(id: string): Promise<User> {
       return await this.repository.findOne({
        relations: {address: true},
        select: ["id", "email", "name", "address"],
        where: {id}

       }) as User
    }

    async markUserAsLogged(id: string): Promise<void> {
        const user = this.repository.create({
            id,
            is_logged: true

        })

        await this.repository.save(user)
    }

    async unmarkUserAsLogged(id: string): Promise<void> {
        const user = this.repository.create({
            id,
            is_logged: false

        })

        await this.repository.save(user)
    }

}

export { UsersRepository }