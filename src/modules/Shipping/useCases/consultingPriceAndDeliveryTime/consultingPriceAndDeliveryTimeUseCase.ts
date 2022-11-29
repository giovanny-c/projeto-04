import { IAddressesRepository } from "@modules/Accounts/repositories/IAddressesRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { Service, Shape } from "@shared/container/providers/shippingProvider/dtos/ShippingDTOs";
import { IShippingProvider } from "@shared/container/providers/shippingProvider/IShippingProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


@injectable()
class ConsultingPriceAndDeliveryTimeUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("ShippingProvider")
        private shippingProvider: IShippingProvider,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("AddressesRepository")
        private addressesRepository: IAddressesRepository,

    ){

    }

    async execute(zipcode: string, product_id: string, typeOfService: string[]){

        const product = await this.productsRepository.findById(product_id)
        
        if(!product){
            throw new AppError("Product not found", 400)
        }

        const address = await this.addressesRepository.findUserDefaultAddress(product.vendor_id)

        const isValidZipcode = await this.shippingProvider.validZipcode(zipcode)

        if(!isValidZipcode.cep.match(/(\d{5})-? ?(\d{3})/)){
            throw new AppError("cep not valid", 400)
        }

        const response = await this.shippingProvider.calculatePriceAndDeliveryTime({
            customerZipcode: zipcode,
            productDiameter: product.diameter,
            productHeight: product.height,
            productLenght: product.lenght,
            productShape: product.shape as Shape,
            productWeight: product.weight,
            productWidth: product.width,
            typeOfService: typeOfService as Service[],
            vendorFacilityZipcode: address.zipcode

            

        })

        return response

    }

}

export {
    ConsultingPriceAndDeliveryTimeUseCase
}