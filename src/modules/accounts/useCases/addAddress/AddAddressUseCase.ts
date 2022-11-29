import { ISaveAddress } from "@modules/Accounts/dtos/ISaveAddressDTO";
import { Address } from "@modules/Accounts/entities/Address";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class AddAddressUseCase {
    constructor(
      @inject("AddressRepository")
      private addressRepository: IAddressesRepository,
      @inject("Userspository")
      private usersRepository: IUsersRepository
    ) {}
      
    async execute({   
      address,
      address_number,
      city,
      country,
      default_address,    
      neighborhood,         
      state,    
      user_id,
      zipcode,
    }: ISaveAddress): Promise<Address> {

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
          throw new AppError("User not found", 400);
        }

        const count_addresses = await this.addressRepository.findAllUsersAddresses(
          user_id
        );
        const max_addresses = 3;

        if (count_addresses.length > max_addresses) {
          throw new AppError(`You already have ${max_addresses}. The you cant add more addresses`)
        }

        const _address = await this.addressRepository.save({
          address,
          address_number,
          neighborhood,
          city,
          state,
          country,
          zipcode,
          user_id,
          default_address
        })

        return _address

    }
}

export { AddAddressUseCase };
