import { Address } from "@modules/Accounts/entities/Address";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class GetAddressUseCase {
    constructor(
      @inject("AddressesRepository")
      private addressRepository: IAddressesRepository,
      @inject("Userspository")
      private usersRepository: IUsersRepository
    ) {}
      
    async execute(address_id: string, user_id: string): Promise<Address> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
          throw new AppError("User not found", 400);
        }

        return await this.addressRepository.findById(address_id)

    }
}

export {GetAddressUseCase };
