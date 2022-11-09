import { inject, injectable } from "tsyringe";
import { getExecutionTime } from "../../../../utils/decorators/executionTime";
import { inspect } from "../../../../utils/decorators/inspect";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IGetProfileRequest, IGetProfileResponse } from "./GetProfileDTO";
import { instanceToInstance, instanceToPlain,  } from "class-transformer";
import ICacheProvider from "@shared/container/providers/cacheProvider/ICacheProvider";




@injectable()
class GetProfileUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CacheProvider")
        private cacheProvider: ICacheProvider,

    ) { }

    @inspect()
    @getExecutionTime() // modifica o execTime primeiro e depois o inspect 
    async execute({ id }: IGetProfileRequest): Promise<IGetProfileResponse> {



        if (!id) {
            throw new AppError("Id missing", 400)
        }

        let user

        const userRedis = await this.cacheProvider.getRedis(`user-${id}`) as string
        console.log(userRedis)



        if (!userRedis) {
            user = await this.usersRepository.findById(id)

            

            if (!user) {
                throw new AppError("User not found", 400)
            }
            
            
            await this.cacheProvider.setRedis(`user-${user.id}`, JSON.stringify(instanceToPlain(user)))

            return  JSON.parse(await this.cacheProvider.getRedis(`user-${id}`) as string)
        }


        
        user = JSON.parse(userRedis)


        return user 
    }
}
export { GetProfileUseCase }