import { inject, injectable } from "tsyringe";
import { getExecutionTime } from "../../../../utils/decorators/executionTime";
import { inspect } from "../../../../utils/decorators/inspect";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IGetProfileRequest, IGetProfileResponse } from "./GetProfileDTO";
import {  instanceToPlain  } from "class-transformer";
import ICacheProvider from "@shared/container/providers/cacheProvider/ICacheProvider";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { User } from "@modules/Accounts/entities/User";




@injectable()
class GetProfileUseCase {


    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CacheProvider")
        private cacheProvider: ICacheProvider,
        @inject("AddressRepository")
        private addressRepository: IAddressesRepository,

    ) { }

    @inspect()
    @getExecutionTime() // modifica o execTime primeiro e depois o inspect 
    async execute({ id }: IGetProfileRequest): Promise<IGetProfileResponse> {



        if (!id) {
            throw new AppError("Id missing", 400)
        }

        let user

        const userRedis = await this.cacheProvider.getRedis(`user-${id}`) as string
        
      
        user = JSON.parse(userRedis)

            
        if (!userRedis) {
            user = await this.usersRepository.findById(id)

            

            if (!user) {
                throw new AppError("User not found", 400)
            }
            
            
            await this.cacheProvider.setRedis(`user-${user.id}`, JSON.stringify(instanceToPlain(user)))

            user = JSON.parse(await this.cacheProvider.getRedis(`user-${id}`) as string)
        }

        //adress
        const addresses = await this.addressRepository.findAllUsersAddresses(user.id) 


        return {
            email: user.email,
            name: user.name,
            addresses
        }
        
    }
}
export { GetProfileUseCase }