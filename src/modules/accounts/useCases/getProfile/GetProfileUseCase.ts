import { inject, injectable } from "tsyringe";
import { getExecutionTime } from "../../../../utils/decorators/executionTime";
import { inspect } from "../../../../utils/decorators/inspect";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IGetProfileRequest, IGetProfileResponse } from "./GetProfileDTO";
import { getRedis } from "@shared/redis/redisConfig";



@injectable()
class GetProfileUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    @inspect()
    @getExecutionTime() // modifica o execTime primeiro e depois o inspect 
    async execute({ id }: IGetProfileRequest): Promise<IGetProfileResponse> {



        if (!id) {
            throw new AppError("Id missing", 400)
        }

        let user

        const userRedis = await getRedis(`user-${id}`)
        console.log(userRedis)



        if (!userRedis) {
            user = await this.usersRepository.findById(id)

            if (!user) {
                throw new AppError("User not found", 400)
            }
        }


        user = JSON.parse(userRedis)


        return {
            name: user.name,
            email: user.email
        }
    }
}
export { GetProfileUseCase }