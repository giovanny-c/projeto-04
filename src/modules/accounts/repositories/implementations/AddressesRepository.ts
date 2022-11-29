import { ISaveAddress } from "@modules/Accounts/dtos/ISaveAddressDTO"
import { Address } from "@modules/Accounts/entities/Address"
import { dataSource } from "database"
import { Repository } from "typeorm"
import { IAddressesRepository } from "../IAddressesRepository"



class AddressesRepository implements IAddressesRepository {

    private repository: Repository<Address>

    constructor(){
        this.repository = dataSource.getRepository(Address)
    }

    async save({address, address_number, city, country, default_address = false, neighborhood, state, user_id, zipcode, id }: ISaveAddress): Promise<Address> {
        

        const _address = this.repository.create({
            id,
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

        return await this.repository.save(_address)
        
    }
    async findById(id: string): Promise<Address> {
        
        return await this.repository.findOneBy({id}) as Address
    }
    async findUserDefaultAddress(user_id: string): Promise<Address> {
        return await this.repository.findOne({
            where: {user_id, default_address: true}
        }) as Address
    }
    async findAllUsersAddresses(user_id: string): Promise<Address[]> {
        return await this.repository.findBy({user_id})
    }
    async delete(id: string): Promise<void> {
        
        await this.repository.delete(id)
    }



}

export {
    AddressesRepository
}