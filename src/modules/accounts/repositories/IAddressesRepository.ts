import { ISaveAddress } from "../dtos/ISaveAddressDTO"
import { Address } from "../entities/Address"





interface IAddressesRepository {

    save(data: ISaveAddress): Promise<Address>
    findById(id: string): Promise<Address>
    findUserDefaultAddress(user_id: string): Promise<Address>
    findAllUsersAddresses(user_id: string): Promise<Address[]>
    delete(id: string): Promise<void>

}

export {
    IAddressesRepository
}