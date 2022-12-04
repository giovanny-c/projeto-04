import { ISaveAddress } from "@modules/Accounts/dtos/ISaveAddressDTO";
import { Address } from "@modules/Accounts/entities/Address";
import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { count } from "console";
import { inject, injectable } from "tsyringe";

@injectable()
class AddAddressUseCase {
    constructor(
      @inject("AddressesRepository")
      private addressRepository: IAddressesRepository,
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
    ) {}
      
    async execute({   
      id: address_id,
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

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
          throw new AppError("User not found", 400)
        }

        const count_addresses = await this.addressRepository.findAllUsersAddresses(user_id)
        const max_addresses = 2
        
        // // max de 3 endereços e nao tiver o id passado pelo endereço atual
        if (count_addresses.length > max_addresses && !count_addresses.find(a => a.id === address_id)) {
          throw new AppError(`You already have ${max_addresses+1}. The you cant add more addresses`)
          }

        //se tiver outro default address
        count_addresses.forEach(async(current_address) => {

         
          
          // se o default address encontrado for true e o default address do endereço adicionado tbm for true
          if(current_address.default_address === true && default_address === true && address_id != current_address.id){

            // muda os outros D_A para false
            await this.addressRepository.save({
              ...current_address,
              default_address: false
            })


          }

        });

        //se todos os default address for false ou se for o primeiro address
        if(count_addresses.every(a => a.default_address === false) || !count_addresses.length){

          default_address = true
        }

        

        const _address = await this.addressRepository.save({
          id: address_id,
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
