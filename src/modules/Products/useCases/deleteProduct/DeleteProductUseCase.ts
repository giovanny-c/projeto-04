import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/Products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteProductUseCase {

    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(user_id: string, product_id: string): Promise<string> {

        try {


            const user = await this.usersRepository.findById(user_id)

            const product = await this.productsRepository.findById(product_id)

            if (product.vendor_id !== user.id) {

                throw new AppError("Forbidden", 403)

            }

            await this.productsRepository.deleteProduct(product_id)

            return product.id

        } catch (error) {
            throw error
        }
    }

}

export { DeleteProductUseCase }