import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { ISaveProduct } from "@modules/Products/dtos/ISaveProductDTO";
import { Product } from "@modules/Products/entities/Product";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IFile } from "@modules/File/dtos/IFileDTO"
import { IRequestSaveProduct } from "./IRequestSaveProductDTO";
import { ICategoriesRepository } from "@modules/Categories/repositories/ICategoriesRepository";

@injectable()
class SaveProductUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository,

    ) {

    }


    async execute({ 
        id, 
        name, 
        vendor_id, 
        available, 
        description, 
        price,
        quantity,
        category,   
        shape,
        weight,
        lenght,
        height,
        width,
        diameter }: IRequestSaveProduct): Promise<Product> {
        

            const userExist = await this.usersRepository.findById(vendor_id)

            if (!userExist) {
                throw new AppError("User do not exists", 400)
            }

            let is_available

            available === "true" ? is_available = true : is_available = false


            const {id: category_id} = await this.categoriesRepository.findByName(category as string)



            if (id) {

                const product = await this.productsRepository.findById(id as string)


                if (product && product.vendor_id !== vendor_id) {
                    throw new AppError("You're not the vendor of this product", 401)
                }

                if (quantity === 0 && is_available === true) {
                    throw new AppError("You cant offer a product without a stock", 400)
                }


                if (product) {

                    // if (this.dateProvider.compareDiferenceIn(this.dateProvider.dateNow(), product.updated_at, "hours") < 3){

                    //     throw new AppError("You cant update a product to often", 401) 
                    // }

                        return await this.productsRepository.save({
                            id,
                            name,
                            vendor_id: vendor_id as string,
                            description: description,
                            price: price,
                            old_price: product.price,
                            quantity: quantity,
                            available: is_available,
                            created_at: product.created_at,
                            updated_at: this.dateProvider.dateNow(),
                            category_id,  
                            shape,
                            weight,
                            lenght,
                            height,
                            width,
                            diameter
                        })
                }

            }

            return await this.productsRepository.save({
                name,
                vendor_id: vendor_id,
                description: description,
                price: price,
                quantity: quantity,
                available: is_available,
                created_at: this.dateProvider.dateNow(),
                updated_at: this.dateProvider.dateNow(),
                category_id,   
                shape,
                weight,
                lenght,
                height,
                width,
                diameter
            })


    }
}

export { SaveProductUseCase }