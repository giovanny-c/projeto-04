import { inject, injectable } from "tsyringe";
import { ISaveUserDTO } from "../../dtos/ISaveUserDTO";

import { AppError } from "../../../../shared/errors/AppError";
import { genPassword } from "../../../../utils/passwordUtils/passwordUtils"
import { User } from "@modules/Accounts/entities/User";
import { instanceToPlain } from "class-transformer";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

    ) {

    }


    async execute({ name, email, password, is_confirmed = false }: ISaveUserDTO): Promise<User> {
        //pegar os dados por form no front (multer e erc)
        //hash de senha 
        try {
            const userExists = await this.usersRepository.findByEmail(email as string)

            if (userExists) {
                throw new AppError("This email was registered already", 400)//fazer middleware de error
            }

            if (!password || password === undefined) {

                throw new AppError("Please provide a valid password", 400)
            }

            const { salt, hash } = genPassword(password)

            //const passwordHash = await hash(password as string, 8)

            const user = await this.usersRepository.save({ name, email, password_hash: hash, salt, is_confirmed })
            
            return instanceToPlain(user) as User

        } catch (error) {
            // throw new AppError("There was not possible to create a user, please try again. If the error persists contact the suport", 500)
            throw error
        }




    }

}

export { CreateUserUseCase }